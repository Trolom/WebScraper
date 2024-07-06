import React, { useEffect } from 'react';
import $ from 'jquery';

const Footer = () => {
	useEffect(() => {
		const returnToTopButton = document.querySelector('.return-to-top');
	
		const handleScroll = () => {
		  if (window.scrollY > 600) {
			returnToTopButton.style.display = 'block';
		  } else {
			returnToTopButton.style.display = 'none';
		  }
		};
	
		const handleClick = (event) => {
		  event.preventDefault();
		  window.scrollTo({ top: 0, behavior: 'smooth' });
		};
	
		window.addEventListener('scroll', handleScroll);
		returnToTopButton.addEventListener('click', handleClick);
	
		// Cleanup event listeners on component unmount
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		  returnToTopButton.removeEventListener('click', handleClick);
		};
	  }, []);

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer-menu">
          <div className="row">
            <div className="col-sm-3">
              <div className="navbar-header">
                <a className="navbar-brand" href="index.html">web<span>scraper</span></a>
              </div>
            </div>
            <div className="col-sm-9">
              <ul className="footer-menu-item">
                <li className="scroll"><a href="#home">home</a></li>
                <li className="scroll"><a href="#works">how it works</a></li>
                <li className="scroll"><a href="#about">overview</a></li>
                <li className="scroll"><a href="#faq">faq</a></li>
                <li className="scroll"><a href="#pricing">pricing</a></li>
                <li className="scroll"><a href="#reviews">reviews</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="hm-footer-copyright">
          <div className="row">
            <div className="col-sm-5">
              <p>
                &copy; copyright. designed and developed by <a href="https://www.themesine.com/">themesine</a>
              </p>
            </div>
            <div className="col-sm-7">
              <div className="footer-social">
                <span><i className="fa fa-phone"> +1  (222) 777 8888</i></span>
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-google-plus"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="scroll-Top">
        <div className="return-to-top">
          <i className="fa fa-angle-up" id="scroll-top" data-toggle="tooltip" data-placement="top" title="Back to Top" aria-hidden="true"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
