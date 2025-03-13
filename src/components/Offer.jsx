import Image from "next/image";
import OfferSeries from "@/assets/img/offer-series.png";
import OldBooks from "@/assets/img/old-books.png";
import VeryOldBooks from "@/assets/img/very-old-books.jpg";
import OldBooksPreview from "@/assets/img/old-books-removebg-preview.png";
import SeriesCatalog from "@/assets/img/series-catalog.png";

export default function Offer() {
  return (
    <div className="container-fluid offer pt-5">
      <div className="row px-xl-5">
        <div className="col-md-6 pb-4">
          <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
            <Image
              width={100}
              height={100}
              layout="responsive"
              src={SeriesCatalog}
              alt=""
            />
            <div className="position-relative" style={{ zIndex: "1" }}>
              <h5 className="text-uppercase text-primary mb-3">
                Discover some new contents
              </h5>
              <h1 className="mb-4 font-weight-semi-bold">New Series</h1>
              <a href="" className="btn btn-outline-primary py-md-2 px-md-3">
                Explore Now
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 pb-4">
          <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
            <Image
              width={100}
              height={100}
              layout="responsive"
              src={OldBooksPreview}
              alt=""
            />
            <div className="position-relative" style={{ zIndex: "1" }}>
              <h5 className="text-uppercase text-primary mb-3">
                Discover some very old contents
              </h5>
              <h1 className="mb-4 font-weight-semi-bold">Old Books</h1>
              <a href="" className="btn btn-outline-primary py-md-2 px-md-3">
                Read Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
