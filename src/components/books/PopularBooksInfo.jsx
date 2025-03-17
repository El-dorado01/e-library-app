"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PopularBooksInfo({ books: initialBooks }) {
  const [books] = useState(initialBooks || []);
  return (
    <div className="row px-xl-5 pb-3">
      {books.length > 0 ? (
        books.map((book, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={index}>
            <div className="card product-item border-0 mb-4">
              <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                {book.cover ? (
                  <Image
                    className="img-fluid w-100"
                    src={book.cover}
                    alt=""
                    width={150}
                    height={225}
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZPQAJAQEABeJMJwAAAABJRU5ErkJggg=="
                    onError={(e) => {
                      e.target.src = "/img/avatar_book-sm.png";
                    }}
                  />
                ) : (
                  <Image
                    width={150}
                    height={225}
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                    className="img-fluid w-100"
                    src="/img/avatar_book-sm.png"
                    alt="No Cover Available"
                  />
                )}
              </div>
              <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                <h6
                  className="text-truncate"
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginBottom: "0",
                  }}
                >
                  {book.title}
                </h6>
                <div
                  className="text-truncate mb-3"
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginBottom: "1rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {!book.authors
                    ? "No Information available"
                    : book.authors
                        .map((author) => {
                          return author;
                        })
                        .join(", ")}
                </div>
                <div className="d-flex justify-content-center">
                  <h6>Category:</h6>
                  <h6 className="text-muted ml-2">
                    {book.subjects[0]}
                  </h6>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between bg-light border">
                <Link
                  href={`/book/${book.id}?name=${book.title}`}
                  className="btn btn-sm text-dark p-0"
                >
                  <i className="fas fa-eye text-primary mr-1"></i>View Detail
                </Link>
                <a href="" className="btn btn-sm text-dark p-0">
                  <i className="fas fa-shopping-cart text-primary mr-1"></i>
                  Add To Cart
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No books available right now.</p>
      )}
    </div>
  );
}
