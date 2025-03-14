import Link from "next/link";

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
            <Link href="/category/pediatrics" className="dropdown-item">
              Pediatrics
            </Link>
            <Link href="/category/neurology" className="dropdown-item">
              Neurology
            </Link>
            <Link href="/category/cardiosurgery" className="dropdown-item">
              Cardiosurgery
            </Link>
          </div>
        </div>
        <Link href="/category/sciences" className="nav-item nav-link">
          Sciences
        </Link>
        <Link href="/category/arts" className="nav-item nav-link">
          Arts
        </Link>
        <Link href="/category/accounting" className="nav-item nav-link">
          Accounting
        </Link>
        <Link href="/category/architecture" className="nav-item nav-link">
          Architecture
        </Link>
        <Link href="/category/fantasy" className="nav-item nav-link">
          Fantasy
        </Link>
        <Link href="/category/fiction" className="nav-item nav-link">
          Fiction
        </Link>
        <Link href="/category/textbook" className="nav-item nav-link">
          Textbooks
        </Link>
        <Link href="/category/astronomy" className="nav-item nav-link">
          Astronomy
        </Link>
        <Link href="/category/religion" className="nav-item nav-link">
          Religion
        </Link>
      </div>
    );
};
