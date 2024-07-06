import React, { useEffect } from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';

const Reviews = () => {
	useEffect(() => {
	  const initializeSlickCarousel = () => {
		if ($(".testimonial-carousel").length) {
		  $(".testimonial-carousel").slick({
			infinite: true,
			centerMode: true,
			autoplay: true,
			slidesToShow: 5,
			slidesToScroll: 3,
			autoplaySpeed: 1500,
			responsive: [
			  {
				breakpoint: 1440,
				settings: {
				  slidesToShow: 3,
				},
			  },
			  {
				breakpoint: 1024,
				settings: {
				  slidesToShow: 2,
				},
			  },
			  {
				breakpoint: 991,
				settings: {
				  slidesToShow: 2,
				  centerMode: false,
				},
			  },
			  {
				breakpoint: 767,
				settings: {
				  slidesToShow: 1,
				},
			  },
			],
		  });
		}
	  };
  
	  // Initialize slick carousel after the DOM elements are available
	  initializeSlickCarousel();
  
	  // Cleanup slick instance on component unmount
	  return () => {
		if ($(".testimonial-carousel").hasClass("slick-initialized")) {
		  $(".testimonial-carousel").slick("unslick");
		}
	  };
	}, []);

	return (
	  <section id="reviews" className="reviews">
		<div className="section-header">
		  <h2>clients reviews</h2>
		  <p>What our client say about us</p>
		</div>
		<div className="reviews-content">
		  <div className="testimonial-carousel">
			<div className="single-testimonial-box">
			  <div className="testimonial-description">
				<div className="testimonial-info">
				  <div className="testimonial-img">
					<img src="clients/c1.png" alt="clients" />
				  </div>
				  <div className="testimonial-person">
					<h2>Tom Leakar</h2>
					<h4>london, UK</h4>
					<div className="testimonial-person-star">
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					</div>
				  </div>
				</div>
				<div className="testimonial-comment">
				  <p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis eaque.
				  </p>
				</div>
			  </div>
			</div>
			<div className="single-testimonial-box">
			  <div className="testimonial-description">
				<div className="testimonial-info">
				  <div className="testimonial-img">
					<img src="clients/c2.png" alt="clients" />
				  </div>
				  <div className="testimonial-person">
					<h2>monirul islam</h2>
					<h4>london, UK</h4>
					<div className="testimonial-person-star">
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					</div>
				  </div>
				</div>
				<div className="testimonial-comment">
				  <p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis eaque.
				  </p>
				</div>
			  </div>
			</div>
			<div className="single-testimonial-box">
			  <div className="testimonial-description">
				<div className="testimonial-info">
				  <div className="testimonial-img">
					<img src="clients/c3.png" alt="clients" />
				  </div>
				  <div className="testimonial-person">
					<h2>Shohrab Hossain</h2>
					<h4>london, UK</h4>
					<div className="testimonial-person-star">
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					</div>
				  </div>
				</div>
				<div className="testimonial-comment">
				  <p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis eaque.
				  </p>
				</div>
			  </div>
			</div>
			<div className="single-testimonial-box">
			  <div className="testimonial-description">
				<div className="testimonial-info">
				  <div className="testimonial-img">
					<img src="clients/c4.png" alt="clients" />
				  </div>
				  <div className="testimonial-person">
					<h2>Tom Leakar</h2>
					<h4>london, UK</h4>
					<div className="testimonial-person-star">
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					</div>
				  </div>
				</div>
				<div className="testimonial-comment">
				  <p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis eaque.
				  </p>
				</div>
			  </div>
			</div>
			<div className="single-testimonial-box">
			  <div className="testimonial-description">
				<div className="testimonial-info">
				  <div className="testimonial-img">
					<img src="clients/c1.png" alt="clients" />
				  </div>
				  <div className="testimonial-person">
					<h2>Tom Leakar</h2>
					<h4>london, UK</h4>
					<div className="testimonial-person-star">
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					</div>
				  </div>
				</div>
				<div className="testimonial-comment">
				  <p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis eaque.
				  </p>
				</div>
			  </div>
			</div>
			<div className="single-testimonial-box">
			  <div className="testimonial-description">
				<div className="testimonial-info">
				  <div className="testimonial-img">
					<img src="clients/c2.png" alt="clients" />
				  </div>
				  <div className="testimonial-person">
					<h2>monirul islam</h2>
					<h4>london, UK</h4>
					<div className="testimonial-person-star">
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					</div>
				  </div>
				</div>
				<div className="testimonial-comment">
				  <p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis eaque.
				  </p>
				</div>
			  </div>
			</div>
			<div className="single-testimonial-box">
			  <div className="testimonial-description">
				<div className="testimonial-info">
				  <div className="testimonial-img">
					<img src="clients/c3.png" alt="clients" />
				  </div>
				  <div className="testimonial-person">
					<h2>Shohrab Hossain</h2>
					<h4>london, UK</h4>
					<div className="testimonial-person-star">
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					</div>
				  </div>
				</div>
				<div className="testimonial-comment">
				  <p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis eaque.
				  </p>
				</div>
			  </div>
			</div>
			<div className="single-testimonial-box">
			  <div className="testimonial-description">
				<div className="testimonial-info">
				  <div className="testimonial-img">
					<img src="clients/c4.png" alt="clients" />
				  </div>
				  <div className="testimonial-person">
					<h2>Tom Leakar</h2>
					<h4>london, UK</h4>
					<div className="testimonial-person-star">
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					  <i className="fa fa-star"></i>
					</div>
				  </div>
				</div>
				<div className="testimonial-comment">
				  <p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis eaque.
				  </p>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </section>
	);
  };
  
  export default Reviews;
  