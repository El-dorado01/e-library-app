import { delay } from "./delay";

// Google Books API base URL (replace YOUR_API_KEY with your actual key later)
const GOOGLE_BOOKS_API_KEY =
  process.env.GOOGLE_BOOKS_API_KEY || "AIzaSyB7WrXP65MTMlbctW0U_XgO-lC553HlC1E";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

/*
  FETCHES TWO POPULAR BOOKS PER CATEGORY
*/
export async function fetchPopularBooks(sortBy) {
  // await delay(2000); // Uncomment if needed for testing
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
        `${BASE_URL}?q=subject:${encodeURIComponent(
          category
        )}&maxResults=2&orderBy=${sortBy}&key=${GOOGLE_BOOKS_API_KEY}`,
        {
          cache: "force-cache",
        }
      );
      if (!response.ok) {
        throw new Error(
          `API error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        console.warn(`No books found for category: ${category}`);
        continue; // Skip to next category if no results
      }

      const categoryBooks = data.items.map((item) => ({
        id: item.id, // Google Books uses volumeId
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ["Unknown"],
        subjects: item.volumeInfo.categories || ["N/A"],
        cover: item.volumeInfo.imageLinks?.thumbnail || null,
      }));

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
  FETCHES BOOKS PER PAGE FOR A SINGLE CATEGORY
*/
export async function fetchCategoryBooksByPage(category, page) {
  const resultsPerPage = 9;
  const startIndex = (page - 1) * resultsPerPage;

  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(
        category
      )}&maxResults=${resultsPerPage}&startIndex=${startIndex}&orderBy=newest&key=${GOOGLE_BOOKS_API_KEY}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
        const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return {
        books: [],
        totalBooks: 0,
        currentPage: page,
        booksPerPage: resultsPerPage,
        error: "No books found for this category or page.",
      };
    }

    const books = data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ["Unknown"],
      subjects: item.volumeInfo.categories || ["N/A"],
      cover: item.volumeInfo.imageLinks?.thumbnail || null,
      isWork: false, // Google Books doesn’t distinguish works vs editions like Open Library
    }));

    return {
      books,
      totalBooks: data.totalItems || 0,
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
  FETCHES A SINGLE BOOK BY ITS ID
*/
export async function fetchBookById(id) {
  console.log(`Fetching book with ID: ${id}...`);

  try {
    const response = await fetch(
      `${BASE_URL}/${id}?key=${GOOGLE_BOOKS_API_KEY}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No data found for ID: ${id}`);
        return {
          notFound: true,
        };
      }
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Data volume info: ", data);
    

    const book = {
      url:
        `https://books.google.com/books?id=${id}` ||
        data.volumeInfo.canonicalVolumeLink,
      key: data.id,
      title: data.volumeInfo.title,
      subtitle: data.volumeInfo.subtitle,
      numberOfPages: data.volumeInfo.pageCount,
      authors: data.volumeInfo.authors || [
        {
          name: "Unknown",
        },
      ],
      publishers: data.volumeInfo.publisher
        ? [
            {
              name: data.volumeInfo.publisher,
            },
          ]
        : [],
      industryIdentifiers: data.volumeInfo.industryIdentifiers
        ? [data.volumeInfo.industryIdentifiers]
        : [],
      publish_date: data.volumeInfo.publishedDate || "N/A",
      subjects: data.volumeInfo.categories || [],
      excerpts: data.volumeInfo.description
        ? [
            {
              text: data.volumeInfo.description,
            },
          ]
        : [],
      ebooks: data.accessInfo?.pdf?.downloadLink
        ? [
            {
              preview_url: data.accessInfo.pdf.downloadLink,
            },
          ]
        : [],
      cover: data.volumeInfo.imageLinks?.large || null,
    };

    const isDownloadable =
      (data.accessInfo?.pdf?.isAvailable ||
        data.accessInfo?.epub?.isAvailable) &&
      (!!data.accessInfo.pdf.downloadLink ||
        !!data.accessInfo.epub.downloadLink);
    const downloadUrl = isDownloadable
      ? data.accessInfo.pdf.downloadLink || data.accessInfo.epub.downloadLink
      : null;

    // console.log(`Downloadable: ${isDownloadable}, URL: ${downloadUrl}`);
    console.log(`Fetched book: ${book.title}, Downloadable: ${isDownloadable}`);
    return {
      book,
      isDownloadable,
      downloadUrl,
    };
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
