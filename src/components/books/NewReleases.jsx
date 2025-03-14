import { fetchNewReleases } from "@/lib/fetchBooks";
import PopularBooksInfo from "./PopularBooksInfo";

export default async function NewReleases() {
  const { books, error } = await fetchNewReleases("newest");

  if (error) {
    throw new Error(error); // Throw to trigger ErrorBoundary
  }

  return <PopularBooksInfo books={books} />;
}
