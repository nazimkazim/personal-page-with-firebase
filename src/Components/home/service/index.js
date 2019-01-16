import React from 'react';
import bckImg from './../../../Resources/images/bckImg.jpg';

const Service = () => {
  const serviceCardStyle = {
    width: '300px',
    height: '300px',
    margin: '0 auto',
    boxShadow: `0px 7px 19px -2px rgba(0,0,0,0.44)`
  };

  const margin = {
    marginTop: '50px',
    marginBottom: '50px'
  };

  return (
    <div>
      <section
        class="hero has-background-white-ter is-fullheight"
        id="service-section"
      >
        <div class="hero-body">
          <div class="container">
            <h2
              className="has-text-centered is-size-3 has-text-info has-text-weight-semibold is-uppercase"
              style={margin}
            >
              I can help you with
            </h2>
            <div className="columns is-vcentered">
              <div className="column">
                <div style={serviceCardStyle}>
                  <h3 className="has-text-centered" style={{ padding: '30px' }}>
                    <span className="is-size-3 is-uppercase has-text-weight-bold">
                      English
                    </span>
                  </h3>
                  <ul>
                    <li className="has-text-centered is-uppercase">
                      Modern Books
                    </li>
                    <li className="has-text-centered is-uppercase">
                      Communicative approach
                    </li>
                    <li className="has-text-centered is-uppercase">
                      Technology-enriched learning process
                    </li>
                    <li className="has-text-centered is-uppercase">
                      Engaging Activities
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column">
                <div style={serviceCardStyle}>
                  <h3 className="has-text-centered" style={{ padding: '30px' }}>
                    <span className="is-size-3 is-uppercase has-text-weight-bold">
                      Russian
                    </span>
                  </h3>
                  <ul>
                    <li className="has-text-centered is-uppercase">
                      Modern Books
                    </li>
                    <li className="has-text-centered is-uppercase">
                      Communicative approach
                    </li>
                    <li className="has-text-centered is-uppercase">
                      Technology-enriched learning process
                    </li>
                    <li className="has-text-centered is-uppercase">
                      Engaging Activities
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column">
                <div style={serviceCardStyle}>
                  <h3 className="has-text-centered" style={{ padding: '30px' }}>
                    <span className="is-size-3 is-uppercase has-text-weight-bold">
                      Programming Skills
                    </span>
                  </h3>
                  <ul>
                    <li className="has-text-centered is-uppercase">
                      Javascript, React
                    </li>
                    <li className="has-text-centered is-uppercase">
                      CSS, HTML
                    </li>
                    <li className="has-text-centered is-uppercase">
                      Nodejs, MongoDB
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
