import React from 'react';
import CountUp from 'react-countup';

const Statistics = () => {
  return (
    <section id="statistics" className="statistics py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="single-statistics-box text-center">
              <div className="statistics-content">
                <CountUp className="counter" start={0} end={90} duration={2.75} /> <span>K+</span>
              </div>
              <h3>listings</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="single-statistics-box text-center">
              <div className="statistics-content">
                <CountUp className="counter" start={0} end={40} duration={2.75} /> <span>K+</span>
              </div>
              <h3>listing categories</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="single-statistics-box text-center">
              <div className="statistics-content">
                <CountUp className="counter" start={0} end={65} duration={2.75} /> <span>K+</span>
              </div>
              <h3>visitors</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="single-statistics-box text-center">
              <div className="statistics-content">
                <CountUp className="counter" start={0} end={50} duration={2.75} /> <span>K+</span>
              </div>
              <h3>happy clients</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
