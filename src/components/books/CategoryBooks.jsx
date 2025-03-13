import { fetchCategoryBooksByPage } from "@/lib/fetchBooks";
import Books from "./Books";
import Pagination from "../Pagination";

export default async function CategoryBooks({ category, page }) {
  const { books, totalBooks, currentPage, booksPerPage, error } =
    await fetchCategoryBooksByPage(category, page);

  if (error) {
    throw new Error(error); // Throw to trigger ErrorBoundary
  }

  return (
    <>
      <Books
        books={books}
        category={category}
        currentPage={page}
        totalBooks={totalBooks}
        booksPerPage={booksPerPage}
      />
      <Pagination
        category={category}
        currentPage={currentPage}
        totalBooks={totalBooks}
        booksPerPage={booksPerPage}
      />
    </>
  );
}
