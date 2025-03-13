import Featured from "@/components/Featured";
import Categories from "@/components/Categories";
import Offer from "@/components/Offer";
import Subscribe from "@/components/Subscribe";
import NewReleases from "@/components/books/NewReleases";
import PopularBooks from "@/components/books/PopularBooks";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

export default async function Home() {
  return (
    <>
      <Featured />
      <Categories />
      <Offer />
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Popular Books</span>
          </h2>
        </div>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
            <PopularBooks />
          </Suspense>
        </ErrorBoundary>
      </div>
      <Subscribe />
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">New Releases</span>
          </h2>
        </div>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
            <NewReleases />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
