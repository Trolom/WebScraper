import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

const NavBarGeneral = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <section className="top-area">
      <div className="header-area">
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              web<span>scraper</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-menu"
              aria-controls="navbar-menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbar-menu">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link scrollto" href="#faq">Faq</a>
                </li>
                {isAuthenticated && (
                  <li className="nav-item">
                    <a className="nav-link" href="/user/me">User</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="clearfix"></div>
    </section>
  );
};

export default NavBarGeneral;
