import PageHeader from "@/components/PageHeader";
import Filter from "@/components/Filter";
// import CategoryBooks from "@/components/books/CategoryBooks";
import CategoryBooksClient from "@/components/books/CategoryBooksClient";
import CategoryBookSearch from "@/components/CategoryBookSearch";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Suspense } from "react";
import { fetchCategoryBooksByPage } from "@/lib/fetchBooks";

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const allParams = await searchParams;
  const page = allParams.page || "1";
  const query = allParams.query || null;
  const sortBy = allParams.sortBy || "relevance";

  // Fetch initial data server-side
  const initialData = await fetchCategoryBooksByPage(
    category,
    page,
    sortBy,
    query
  );

  return (
    <>
      <PageHeader pageTitle={category} pageName={"Category"} />
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <Filter />
          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <CategoryBookSearch category={category} sortBy={sortBy} />
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  {/* <CategoryBooks page={page} category={category} /> */}
                  <CategoryBooksClient
                    initialData={initialData}
                    category={category}
                    sortBy={sortBy}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
