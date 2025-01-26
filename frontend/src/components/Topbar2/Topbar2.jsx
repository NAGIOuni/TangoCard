import React from "react";

export default function Topbar2() {
  return (
    <>
      <div>
        <nav className="navbar sticky-top bg-dark  border-bottom border-bottom-dark navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="#">
              Tango!
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
                <a className="nav-link" href="/login">
                  Login
                </a>
                <a className="nav-link" href="/register">
                  Register
                </a>
                <a className="nav-link" href="/show">
                  Show
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
