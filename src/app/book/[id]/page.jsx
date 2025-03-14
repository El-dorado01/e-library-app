import PageHeader from "@/components/PageHeader";

import SingleBook from "@/components/books/SingleBook";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import FeaturedBooks from "@/components/books/FeaturedBooks";
import { Suspense } from "react";
import { fetchBookById } from "@/lib/fetchBooks";

export default async function page({ params, searchParams }) {
  const { id } = await params;
  const allParams = await searchParams;
  const name = allParams.name || id;

  const bookData = await fetchBookById(id);
  
  

  return (
    <>
      <PageHeader pageTitle={bookData.book.title} pageName={"Book"} />
      <div className="container-fluid py-5">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
            <SingleBook bookData={bookData} id={id} name={name} />
          </Suspense>
        </ErrorBoundary>
      </div>
      {/* <FeaturedBooks />; */}
    </>
  );
}
