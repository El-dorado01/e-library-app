export default function MoreBookInfo({ bookInfo }) {
  return (
    <div className="row px-xl-5">
      <div className="col">
        <div className="nav nav-tabs justify-content-center border-secondary mb-4">
          <a
            className="nav-item nav-link active"
            data-toggle="tab"
            href="#tab-pane-1"
          >
            Description
          </a>
          <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">
            Information
          </a>
          <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">
            Reviews (0)
          </a>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="tab-pane-1">
            <h4 className="mb-3">Book Description</h4>
            {bookInfo.excerpts
              ? bookInfo.excerpts.map((desc) => (
                  <p key={desc.text}>{desc.text}</p>
                ))
              : "No description"}
          </div>
          <div className="tab-pane fade" id="tab-pane-2">
            <h4 className="mb-3">Additional Information</h4>
            <p>
              {bookInfo.subtitle
                ? bookInfo.subtitle
                : "No subtitle for this book"}
            </p>
            <div className="row">
              <div className="col-md-6">
                <h5>Publication Details</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Publishers:{" "}
                    {bookInfo.publishers.map((publisher) => (
                      <span key={publisher.name}>{publisher.name}</span>
                    ))}
                    .
                  </li>
                  <li className="list-group-item px-0">
                    Published Date: {bookInfo.publish_date}.
                  </li>
                  {/* {bookInfo.industryIdentifiers
                    ? bookInfo.industryIdentifiers[0].map((industryIdentifier) => (
                        <li
                          className="list-group-item px-0"
                          key={industryIdentifier.identifier}
                        >
                            {industryIdentifier.type +
                              ": " +
                              industryIdentifier.identifier}
                        </li>
                      ))
                    : "No information available"} */}
                </ul>
              </div>
              <div className="col-md-6">
                <h5>Subjects</h5>
                <ul className="list-group list-group-flush">
                  {bookInfo.subjects.slice(0, 4).map((subject) => (
                    <li className="list-group-item px-0" key={subject}>
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab-pane-3">
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-4">1 review for "Colorful Stylish Shirt"</h4>
                <div className="media mb-4">
                  <img
                    src="/img/user.jpg"
                    alt="Image"
                    className="img-fluid mr-3 mt-1"
                    style={{ width: "45px" }}
                  />
                  <div className="media-body">
                    <h6>
                      John Doe
                      <small>
                        {" "}
                        - <i>01 Jan 2045</i>
                      </small>
                    </h6>
                    <div className="text-primary mb-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <i className="far fa-star"></i>
                    </div>
                    <p>
                      Diam amet duo labore stet elitr ea clita ipsum, tempor
                      labore accusam ipsum et no at. Kasd diam tempor rebum
                      magna dolores sed sed eirmod ipsum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4 className="mb-4">Leave a review</h4>
                <small>
                  Your email address will not be published. Required fields are
                  marked *
                </small>
                <div className="d-flex my-3">
                  <p className="mb-0 mr-2">Your Rating * :</p>
                  <div className="text-primary">
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="message">Your Review *</label>
                    <textarea
                      id="message"
                      cols="30"
                      rows="5"
                      className="form-control"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group mb-0">
                    <input
                      type="submit"
                      value="Leave Your Review"
                      className="btn btn-primary px-3"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
