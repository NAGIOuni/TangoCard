import React, { useContext } from "react";
import { logoutCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const logout = () => {
    logoutCall(user, dispatch);
  };

  return (
    <>
      <div>
        <nav className="navbar bg-dark sticky-top border-bottom border-bottom-dark navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="/">
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
            <button className="btn btn-secondary me-3" onClick={logout}>
              LogOut
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
