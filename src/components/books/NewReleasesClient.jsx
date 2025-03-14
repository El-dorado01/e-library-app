"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Books from "./Books";
import PaginationTwo from "../PaginationTwo";
import { fetchNewReleasesByPage } from "@/lib/fetchBooks";
import LoadingSkeleton from "../LoadingSkeleton";
import { usePathname } from "next/navigation";

export default function CategoryBooksClient({ initialData }) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const pathname = usePathname();

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only refetch if the page has changed from the initial data

    if (parseInt(page, 10) !== data.currentPage) {
      async function loadBooks() {
        setLoading(true);
        let result;
        switch (pathname) {
            case "/new_releases":
                result = await fetchNewReleasesByPage("books", "newest", page);
                break;
            case "/popular_books":
                result = await fetchNewReleasesByPage("books", "relevance", page);
                break;
        
            default:
                break;
        }
        setData(result);
        setLoading(false);
      }
      loadBooks();
    }
  }, [page, data.currentPage]);

  if (data.error) {
    throw new Error(data.error); // Throw to ErrorBoundary
  }

  const { books, totalBooks, currentPage, booksPerPage } = data;

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <Books books={books} />
      <PaginationTwo
        url={pathname}
        currentPage={currentPage}
        totalBooks={totalBooks}
        booksPerPage={booksPerPage}
      />
    </>
  );
}
