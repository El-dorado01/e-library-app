import DownloadButton from "../DownloadButton";
import BookDescription from "./BookDescription";
import BookShareButtons from "./BookShareButtons";

export default function BookInfo({
  title,
  authors,
  descriptions,
  numberOfPages,
  ebooks,
  isDownloadable,
  downloadUrl,
  id,
  bookUrl,
}) {
  return (
    <div className="col-lg-7 pb-5">
      <h3 className="font-weight-semi-bold">{title}</h3>
      <div className="d-flex mb-3">
        <div className="text-primary mr-2">
          <small className="fas fa-star"></small>
          <small className="fas fa-star"></small>
          <small className="fas fa-star"></small>
          <small className="fas fa-star-half-alt"></small>
          <small className="far fa-star"></small>
        </div>
        <small className="pt-1">(50 Reviews)</small>
      </div>
      {/* <h3 className="font-weight-semi-bold mb-4">$150.00</h3> */}
      <BookDescription descriptions={descriptions} />
      <div className="d-flex mb-3">
        <p className="text-dark font-weight-medium mb-0 mr-3">Author(s):</p>
        {!authors
          ? "No Information available"
          : authors
              .map((author) => {
                return author;
              })
              .join(", ")}
      </div>

      <div className="d-flex mb-4">
        <p className="text-dark font-weight-medium mb-0 mr-3">
          Number of Pages:
        </p>{" "}
        {numberOfPages}
      </div>
      <DownloadButton
        isDownloadable={isDownloadable}
        downloadUrl={downloadUrl}
        id={id}
        bookUrl={bookUrl}
      />
      {/* <div className="d-flex align-items-center mb-4 pt-2">
        <div className="input-group quantity mr-3" style={{ width: "130px" }}>
          <div className="input-group-btn">
            <button className="btn btn-primary btn-minus">
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <input
            type="text"
            className="form-control bg-secondary text-center"
            value="1"
            readOnly
          />
          <div className="input-group-btn">
            <button className="btn btn-primary btn-plus">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <button className="btn btn-primary px-3">
          <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
        </button>
      </div> */}
      <BookShareButtons bookTitle={title} bookId={id} />
    </div>
  );
}
