import React, { useEffect } from 'react';

const NavBar = () => {
  useEffect(() => {
    // Smooth scrolling
    const handleSmoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    };

    const scrollLinks = document.querySelectorAll('a.scrollto');
    scrollLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup event listeners on component unmount
    return () => {
      scrollLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

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
                  <a className="nav-link scrollto" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link scrollto" href="#works">How it works</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link scrollto" href="#about">Overview</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link scrollto" href="#faq">FAQ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link scrollto" href="#pricing">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link scrollto" href="#reviews">Reviews</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/user/me">User</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="clearfix"></div>
    </section>
  );
};

export default NavBar;
