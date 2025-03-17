import PageHeader from "@/components/PageHeader";
import Filter from "@/components/Filter";
import NewReleasesClient from "@/components/books/NewReleasesClient";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Suspense } from "react";
import { fetchNewReleasesByPage } from "@/lib/fetchBooks";

export default async function NewReleasesPage({ searchParams }) {
  const allParams = await searchParams;
  const page = allParams.page || "1";

  // Fetch initial data server-side
  const initialData = await fetchNewReleasesByPage("books", "relevance", page);

  return (
    <>
      <PageHeader pageTitle={"Popular Books"} pageName={"Popular Books"} />
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {/* <Filter /> */}
          <div className="col-lg-12 col-md-12">
            <div className="row pb-3">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <NewReleasesClient initialData={initialData} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
