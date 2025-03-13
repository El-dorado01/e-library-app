import { fetchPopularBooks } from "@/lib/fetchBooks";
import PopularBooksInfo from "./PopularBooksInfo";

export default async function PopularBooks() {
  const { books, error } = await fetchPopularBooks("relevance");

  if (error) {
    throw new Error(error); // Throw to trigger ErrorBoundary
  }

  return <PopularBooksInfo books={books} />;
}
