export default function NavbarLinks(params) {
    return (
      <div
        className="navbar-nav w-100 overflow-hidden"
        style={{ height: "410px" }}
      >
        <div className="nav-item dropdown">
          <a href="#" className="nav-link" data-toggle="dropdown">
            Medical <i className="fa fa-angle-down float-right mt-1"></i>
          </a>
          <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
            <a href="" className="dropdown-item">
              Pediatrics
            </a>
            <a href="" className="dropdown-item">
              Neurology
            </a>
            <a href="" className="dropdown-item">
              Cardiosurgery
            </a>
          </div>
        </div>
        <a href="" className="nav-item nav-link">
          Sciences
        </a>
        <a href="" className="nav-item nav-link">
          Arts
        </a>
        <a href="" className="nav-item nav-link">
          Accounting
        </a>
        <a href="" className="nav-item nav-link">
          Architecture
        </a>
        <a href="" className="nav-item nav-link">
          Fantasy
        </a>
        <a href="" className="nav-item nav-link">
          Fiction
        </a>
        <a href="" className="nav-item nav-link">
          Actions
        </a>
        <a href="" className="nav-item nav-link">
          Astronomy
        </a>
      </div>
    );
};
