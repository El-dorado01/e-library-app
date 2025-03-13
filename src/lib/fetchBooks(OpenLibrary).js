import { delay } from "./delay";

/*
  THIS FUNCTION FETCHES TWO BOOKS ON EACH CATEGORY BASED ON THEIR RATING/POPULARITY
*/
export async function fetchPopularBooks(sortBy) {
  // await delay(2000);
  const books = [];
  const categories = [
    "science",
    "art",
    "medical",
    "accounting",
    "astronomy",
    "history",
  ];

  try {
    for (const category of categories) {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=subject:${encodeURIComponent(
          category
        )}&mode=ebooks&sort=${sortBy}`,
        { cache: "force-cache" }
      );
      if (!response.ok) {
        throw new Error(
          `API error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      if (!data.docs || data.docs.length === 0) {
        return {
          books: [],
          error: "No books found for this category or query.",
        };
      }

      // const categoryBooks = data.docs.slice(0, 2).map((doc) => ({
      //   id: doc.cover_edition_key,
      //   title: doc.title,
      //   authors: doc.author_name,
      //   subjects: doc.subject,
      //   cover: doc.cover_i
      //     ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      //     : null,
      // }));

      // books.push(...categoryBooks);


      const categoryBooks = await Promise.all(
        data.docs.slice(0, 2).map(async (doc) => {
          let id = doc.cover_edition_key; //
          let coverUrl = doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : null;
          let subjects = doc.subject || doc.subjects;

          // If no edition key, use work ID and try to fetch an edition
          if (!id) {
            const workId = doc.key.split("/").pop();
            id = workId; //Fallback to work ID

            const editionResponse = await fetch(
              `https://openlibrary.org/works/${workId}/editions.json`,
              { cache: "force-cache" }
            );
            if (!editionResponse.ok) {
              if (editionResponse.status === 404) {
                throw new Error(
                  `Book not found: Invalid or unmatched ID (${editionId})`
                );
              }
              throw new Error(
                `API error: ${editionResponse.status} - ${editionResponse.statusText}`
              );
            }

            const editionsData = await editionResponse.json();

            // Find first edition with a cover
            const editionWithCover = editionsData.entries?.[0];

            if (editionWithCover) {
              id = editionWithCover.key.split("/").pop();
              coverUrl = editionWithCover.covers?.[0]
                ? `https://covers.openlibrary.org/b/id/${editionWithCover.covers[0]}-M.jpg`
                : null;

              if (!subjects) {
                subjects = editionWithCover.subjects;
              }
            }
          }

          return {
            id,
            title: doc.title,
            authors: doc.author_name,
            subjects: subjects,
            cover: coverUrl,
            isWork: !doc.cover_edition_key, // Flag if it's work ID
          };
        })
      );

      books.push(...categoryBooks);
    }
    return {
      books,
    };
  } catch (error) {
    console.error("Fetch error:", error.message);
    return {
      books: [],
      error: error.message.includes("API error")
        ? `Failed to fetch books: ${error.message}`
        : "Network error: Please check your connection and try again.",
    };
  }
}

/*
THIS FUNCTION FETCHES BOOKS (RESULTS PER PAGE) ON A SINGLE CATEGORY
*/
export async function fetchCategoryBooksByPage(category, page) {
  const resultsPerPage = 9;
  const startNumber = (page - 1) * resultsPerPage;
  const endNumber = page * resultsPerPage;

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=subject:${encodeURIComponent(
        category
      )}&mode=ebooks&sort=new`,
      { cache: "force-cache" }
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.docs || data.docs.length === 0) {
      return {
        books: [],
        totalBooks: 0,
        currentPage: page,
        booksPerPage: resultsPerPage,
        error: "No books found for this category or query.",
      };
    }

    const books = await Promise.all(
      data.docs.slice(startNumber, endNumber).map(async (doc) => {
        let id = doc.cover_edition_key; //
        let coverUrl = doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : null;
        let subjects = doc.subject || doc.subjects;

        // If no edition key, use work ID and try to fetch an edition
        if (!id) {
          const workId = doc.key.split("/").pop();
          id = workId; //Fallback to work ID

          const editionResponse = await fetch(
            `https://openlibrary.org/works/${workId}/editions.json`,
            { cache: "force-cache" }
          );
          if (!editionResponse.ok) {
            if (editionResponse.status === 404) {
              throw new Error(
                `Book not found: Invalid or unmatched ID (${editionId})`
              );
            }
            throw new Error(
              `API error: ${editionResponse.status} - ${editionResponse.statusText}`
            );
          }

          const editionsData = await editionResponse.json();

          // Find first edition with a cover
          const editionWithCover = editionsData.entries?.[0];

          if (editionWithCover) {
            id = editionWithCover.key.split("/").pop();
            coverUrl = editionWithCover.covers?.[0]
              ? `https://covers.openlibrary.org/b/id/${editionWithCover.covers[0]}-M.jpg`
              : null;

            if (!subjects) {
              subjects = editionWithCover.subjects;
            }
          }
        }

        return {
          id,
          title: doc.title,
          authors: doc.author_name,
          subjects: subjects,
          cover: coverUrl,
          isWork: !doc.cover_edition_key, // Flag if it's work ID
        };
      })
    );

    return {
      books,
      totalBooks: data.numFound,
      currentPage: parseInt(page, 10),
      booksPerPage: resultsPerPage,
    };
  } catch (error) {
    console.error("Fetch error:", error.message);
    return {
      books: [],
      totalBooks: 0,
      currentPage: page,
      booksPerPage: resultsPerPage,
      error: error.message.includes("API error")
        ? `Failed to fetch books: ${error.message}`
        : "Network error: Please check your connection and try again.",
    };
  }
}

/*
THIS FUNCTION FETCHES A SINGLE BOOK BY ITS ID
*/ 

export async function fetchBookById(id, name) {
  // console.log(`Fetching book with ID: ${id}...`);

  if (!id || !/^OL\d+M$/.test(id)) {
    console.warn(`Invalid ID format: ${id}`);
    return { notFound: true };
  }

  const url = `https://openlibrary.org/api/books?bibkeys=OLID:${encodeURIComponent(
    id
  )}&format=json&jscmd=data`;
  let response;

  try {
    response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Book not found: Invalid ID (${id})`);
      }
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || Object.keys(data).length === 0 || !data[`OLID:${id}`]) {
      console.warn(`No data found for OLID:${id}`);
      return { notFound: true };
    }

    const dataKey = data[`OLID:${id}`];
    const book = {
      url: dataKey.url, // Open Library URL (e.g., https://openlibrary.org/books/OLID:...)
      key: dataKey.key,
      title: dataKey.title,
      subtitle: dataKey.subtitle,
      numberOfPages: dataKey.number_of_pages || dataKey.pagination,
      authors: dataKey.authors || [{ name: "Unknown" }],
      publishers: dataKey.publishers || [],
      publish_places: dataKey.publish_places || [],
      publish_date: dataKey.publish_date || "N/A",
      subjects: dataKey.subjects || [],
      excerpts: dataKey.excerpts || [],
      ebooks: dataKey.ebooks || [],
      cover: dataKey.cover || {},
    };

  const ebooks = book.ebooks || [];
  let isDownloadable = false;
  let downloadUrl = null;

  if (ebooks.length > 0) {
    const potentialUrl = ebooks[0].preview_url || ebooks[0].read_url;
    if (potentialUrl) {
      // Rudimentary check: assume it's downloadable if it ends in .pdf or .epub
      if (/\.(pdf|epub)$/i.test(potentialUrl)) {
        isDownloadable = true;
        downloadUrl = potentialUrl;
      } else {
        // Optionally verify with a HEAD request (server-side only)
        try {
          const headResponse = await fetch(potentialUrl, { method: 'HEAD' });
          const contentType = headResponse.headers.get('Content-Type');
          if (contentType && (contentType.includes('application/pdf') || contentType.includes('application/epub'))) {
            isDownloadable = true;
            downloadUrl = potentialUrl;
          }
        } catch (e) {
          console.warn(`HEAD request failed for ${potentialUrl}: ${e.message}`);
        }
      }
    }
  }

  console.log(`Downloadable: ${isDownloadable}, URL: ${downloadUrl}`);

    return { book, isDownloadable, downloadUrl };
  } catch (error) {
    console.error("Fetch error:", error.message);
    return {
      book: {},
      error: error.message.includes("not found")
        ? `Book not found: Invalid or unmatched ID (${id})`
        : error.message.includes("API error")
        ? `Failed to fetch book: ${error.message}`
        : "Network error: Please check your connection and try again.",
    };
  }
}
