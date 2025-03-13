"use client";

import mainFunction from "@/scripts/main";
import { useEffect } from "react";
import $ from "jquery";

import { usePathname } from "next/navigation";
import Carousel from "./Carousel";
import CollapsibleNavbar from "./CollapsibleNavbar";
import NonCollapsibleNavbar from "./NonCollapsibleNavbar";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  useEffect(() => {
    mainFunction($);
  }, []);

  const pathname = usePathname();

  return (
    <div className="container-fluid mb-5">
      <div className="row border-top px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a
            className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
            data-toggle="collapse"
            href="#navbar-vertical"
            style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
          >
            <h6 className="m-0">Categories</h6>
            <i className="fa fa-angle-down text-dark"></i>
          </a>
          {pathname === "/" ? (
            <CollapsibleNavbar>
              <NavbarLinks />
            </CollapsibleNavbar>
          ) : (
            <NonCollapsibleNavbar>
              <NavbarLinks />
            </NonCollapsibleNavbar>
          )}
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <a href="" className="text-decoration-none d-block d-lg-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  E
                </span>
                Library
              </h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto py-0">
                <a href="" className="nav-item nav-link active">
                  Home
                </a>
                <a href="" className="nav-item nav-link">
                  Popular Books
                </a>
                <a href="" className="nav-item nav-link">
                  New Releases
                </a>
                {/*<div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Pages
                    </a>
                    <div className="dropdown-menu rounded-0 m-0">
                      <a href="cart.html" className="dropdown-item">
                        Shopping Cart
                      </a>
                      <a href="checkout.html" className="dropdown-item">
                        Checkout
                      </a>
                    </div> 
                  </div>*/}
                <a href="contact.html" className="nav-item nav-link">
                  Contact
                </a>
              </div>
              {/* <div className="navbar-nav ml-auto py-0">
                  <a href="" className="nav-item nav-link">
                    Login
                  </a>
                  <a href="" className="nav-item nav-link">
                    Register
                  </a>
                </div> */}
            </div>
          </nav>
          {pathname == "/" ? <Carousel /> : ""}
        </div>
      </div>
    </div>
  );
}
