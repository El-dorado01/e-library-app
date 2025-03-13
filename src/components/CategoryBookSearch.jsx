export default function CategoryBookSearch() {
    return (
      <div className="col-12 pb-1">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <form action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
              />
              <div className="input-group-append">
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
              <a className="dropdown-item" href="#">
                Latest
              </a>
              <a className="dropdown-item" href="#">
                Popularity
              </a>
              <a className="dropdown-item" href="#">
                Best Rating
              </a>
            </div>
          </div>
        </div>
      </div>
    );
};
