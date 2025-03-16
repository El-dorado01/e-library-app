"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Books from "./Books";
import Pagination from "../Pagination";
import { fetchCategoryBooksByPage } from "@/lib/fetchBooks";
import LoadingSkeleton from "../LoadingSkeleton";

export default function CategoryBooksClient({ initialData, category, sortBy = "relevance" }) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || null;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const result = await fetchCategoryBooksByPage(
        category,
        page,
        sortBy,
        query
      );
      setData(result);
      setLoading(false);
    };

    // Fetch if page or query differs from initial data
    if (
      parseInt(page, 10) !== initialData.currentPage ||
      query !== initialData.query ||
      sortBy !== initialData.sortBy
    ) {
      fetchBooks();
    }
  }, [category, page, query, sortBy, initialData]);

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
      <Pagination
        category={category}
        currentPage={currentPage}
        totalBooks={totalBooks}
        booksPerPage={booksPerPage}
        query={query}
        sortBy={sortBy}
      />
    </>
  );
}
