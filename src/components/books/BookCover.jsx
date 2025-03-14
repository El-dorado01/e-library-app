

"use client";
import Image from "next/image";

export default function BookCover({ cover }) {
  return (
    <div className="col-lg-5 pb-5">
      <div
        id="product-carousel"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner border">
          <div className="carousel-item active">
            {cover ? (
              <Image
                className="w-100 h-100"
                src={cover} // Use cover directly as a string
                alt="Book Cover"
                width={150}
                height={225}
                style={{ maxHeight: "500px", objectFit: "contain" }}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZPQAJAQEABeJMJwAAAABJRU5ErkJggg=="
                onError={(e) => {
                  e.target.src = "/img/avatar_book-sm.png";
                }}
              />
            ) : (
              <Image
                className="w-100 h-100"
                src="/img/avatar_book-sm.png"
                alt="No Cover Available"
                width={150}
                height={225}
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
            )}
          </div>
          {/* Remove duplicate carousel-item unless you have multiple images */}
          <div className="carousel-item">
            {cover ? (
              <Image
                className="w-100 h-100"
                src={cover} // Use cover directly as a string
                alt="Book Cover"
                width={150}
                height={225}
                style={{ maxHeight: "500px", objectFit: "contain" }}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZPQAJAQEABeJMJwAAAABJRU5ErkJggg=="
                onError={(e) => {
                  e.target.src = "/img/avatar_book-sm.png";
                }}
              />
            ) : (
              <Image
                className="w-100 h-100"
                src="/img/avatar_book-sm.png"
                alt="No Cover Available"
                width={150}
                height={225}
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
            )}
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#product-carousel"
          data-slide="prev"
        >
          <i className="fa fa-2x fa-angle-left text-dark"></i>
        </a>
        <a
          className="carousel-control-next"
          href="#product-carousel"
          data-slide="next"
        >
          <i className="fa fa-2x fa-angle-right text-dark"></i>
        </a>
      </div>
    </div>
  );
}