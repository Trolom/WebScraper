import React from 'react';
import '../styles/flaticon.css';

const HowItWorks = () => {
  return (
    <section id="works" className="works">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>How it works</h2>
        </div>
        <div className="section-header">
          <p>Learn More about how our website works</p>
        </div>
        <div className="works-content">
          <div className="row">
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="single-how-works text-center">
                <div className="single-how-works-icon">
                  <i className="flaticon-search"></i>
                </div>
                <h2><a href="#">Choose <span> what to</span> do</a></h2>
                <p>
                  Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt ut labore magna aliqua.
                </p>
                <button className="welcome-hero-btn how-work-btn" onClick={() => window.location.href='#'}>
                  Read more
                </button>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="single-how-works text-center">
                <div className="single-how-works-icon">
                  <i className="flaticon-building"></i>
                </div>
                <h2><a href="#">Find <span> what you want</span></a></h2>
                <p>
                  Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt ut labore magna aliqua.
                </p>
                <button className="welcome-hero-btn how-work-btn" onClick={() => window.location.href='#'}>
                  Read more
                </button>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="single-how-works text-center">
                <div className="single-how-works-icon">
                  <i className="flaticon-list-with-dots"></i>
                </div>
                <h2><a href="#">Explore <span> amazing</span> places</a></h2>
                <p>
                  Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt ut labore magna aliqua.
                </p>
                <button className="welcome-hero-btn how-work-btn" onClick={() => window.location.href='#'}>
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
