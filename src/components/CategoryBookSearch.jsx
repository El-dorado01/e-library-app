"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryBookSearch({ category, sortBy }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    document.querySelector("#categoryBookSearch").requestSubmit();
  };
  // Client-side action handler
  const handleSearch = async (formData) => {
    const input = formData.get("search-input");
    const url = `/category/${category}?query=${encodeURIComponent(
      input
    )}&page=${page}`;

    router.push(url);
  };

  const url = `/category/${category}?page=${page}${
    query ? `&query=${encodeURIComponent(query)}` : ""
  }`;

  return (
    <div className="col-12 pb-1">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <form action={handleSearch} id="categoryBookSearch">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for books from this category..."
              name="search-input"
              required
            />
            <div className="input-group-append" onClick={handleSubmit}>
              <span className="input-group-text bg-transparent text-primary">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </form>
        <div className="dropdown ml-4">
          <button
            className="btn border dropdown-toggle"
            type="button"
            id="triggerId"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort by
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="triggerId"
          >
            <Link className="dropdown-item" href={`${url}&sortBy=newest`}>
              Latest
            </Link>
            <Link className="dropdown-item" href={`${url}&sortBy=relevance`}>
              Popularity
            </Link>
            {/* <Link className="dropdown-item" href={`${url}&sortBy=newest`}>
              Best Rating
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
