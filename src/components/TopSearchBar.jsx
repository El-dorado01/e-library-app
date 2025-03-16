"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { submitSearch } from "@/lib/fetchBooks";

export default function TopSearchBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    document.querySelector("form").requestSubmit();
  };
  // Client-side action handler
  const handleSearch = async (formData) => {
    const input = formData.get("search-input");
    setIsLoading(true);

    try {
      const result = await submitSearch(formData);
      setSearchResult(result);
      setIsLoading(false);
      if (
        document.querySelector(".search-result-panel").style.display == "none"
      ) {
        document.querySelector(".search-result-panel").style.display = "flex";
      }
    } catch (error) {
      // setError(error.message);
      setSearchResult(null);
    }
  };

  const handleClick = (e) => {
    if (!e.target.closest(".search-result-panel")) {
      document.querySelector(".search-result-panel").style.display = "none";
    }
  };

  const handleScroll = () => {
    document.querySelector(".search-result-panel").style.display = "none";
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="col-lg-6 col-6 text-left">
      <form action={handleSearch}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for books with names, authors, ISBNs..."
            name="search-input"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="input-group-append" onClick={handleSubmit}>
            <span className="input-group-text bg-transparent text-primary">
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
      </form>
      <div className="search-result-panel">
        {isLoading && (
          <div className="loading-state">
            <h6>Loading...</h6>
          </div>
        )}
        {searchResult &&
          (searchResult.books.length > 0 ? (
            <>
              <div className="result-display">
                {searchResult.books.map((book) => (
                  <Link
                    href={`/book/${book.id}?name=${book.title}`}
                    key={book.id}
                  >
                    <div className="thumbnail">
                      {book.cover ? (
                        <Image
                          src={book.cover}
                          width={150}
                          height={225}
                          alt="Book Cover"
                          className="image-thumbnail"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZPQAJAQEABeJMJwAAAABJRU5ErkJggg=="
                          onError={(e) => {
                            e.target.src = "/img/avatar_book-sm.png";
                          }}
                        />
                      ) : (
                        <Image
                          src="/img/avatar_book-sm.png"
                          alt="No Cover Available"
                          width={150}
                          height={225}
                          className="image-thumbnail"
                        />
                      )}
                    </div>
                    <div className="info">
                      <h6>
                        {book.title.length > 40
                          ? `${book.title.slice(0, 40)}...`
                          : book.title}
                      </h6>
                      <span style={{ fontSize: "14px" }}>
                        {!book.authors
                          ? "No Information available"
                          : book.authors
                              .map((author) => {
                                return author;
                              })
                              .join(", ")
                              .slice(0, 45)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href={`/books?q=${searchInput}`} className="action-panel">
                <span>Load More...</span>
              </Link>
              {/* <div className="action-panel">
                <input type="checkbox" name="" id="" />{" "}
                <span>Enable Advanced Search</span>
              </div> */}
            </>
          ) : (
            <div className="loading-state">
              <h6>{searchResult.error}</h6>
            </div>
          ))}
      </div>
    </div>
  );
}
