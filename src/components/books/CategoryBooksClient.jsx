"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Books from "./Books";
import Pagination from "../Pagination";
import { fetchCategoryBooksByPage } from "@/lib/fetchBooks";
import LoadingSkeleton from "../LoadingSkeleton";

export default function CategoryBooksClient({ initialData, category }) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(
      "useEffect triggered. URL page:",
      page,
      "Current page:",
      data.currentPage
    );
    // Only refetch if the page has changed from the initial data
    
    if (parseInt(page, 10) !== data.currentPage) {
      async function loadBooks() {
        console.log("Fetching new books for page:", page);
        setLoading(true);
        const result = await fetchCategoryBooksByPage(category, page);
        console.log("Fetch result:", result);
          setData(result);
        setLoading(false);
      }
      loadBooks();
    } else {
      console.log("No fetch needed, page matches currentPage");
    }
  }, [category, page, data.currentPage]);

  if (data.error) {
    throw new Error(data.error); // Throw to ErrorBoundary
  }

  const { books, totalBooks, currentPage, booksPerPage } = data;

  if (loading) {
    return <LoadingSkeleton />; 
  }

  console.log(
    "Rendering with currentPage:",
    currentPage,
    "Books:",
    books.length
  );

  return (
    <>
      <Books
        books={books}
        category={category}
        currentPage={currentPage}
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
