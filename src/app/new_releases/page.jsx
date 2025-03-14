import PageHeader from "@/components/PageHeader";
import Filter from "@/components/Filter";
import CategoryBooksClient from "@/components/books/CategoryBooksClient";
import CategoryBookSearch from "@/components/CategoryBookSearch";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Suspense } from "react";
import { fetchNewReleasesByPage } from "@/lib/fetchBooks";

export default async function NewReleasesPage({ searchParams }) {
  const allParams = await searchParams;
  const page = allParams.page || "1";

  // Fetch initial data server-side
  const initialData = await fetchNewReleasesByPage("newest", page);

  return (
    <>
      <PageHeader pageTitle={"New Releases"} pageName={"New Releases"} />
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <Filter />
          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <CategoryBookSearch />
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  {/* <CategoryBooksClient
                    initialData={initialData}
                    category={"newest"}
                  /> */}
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
