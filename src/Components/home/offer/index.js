import React from 'react';
import { Link } from 'react-router-dom';

const Offer = () => {
  const serviceCardStyle = {
    width: '100px',
    height: '100px',
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
              By taking my classes you get
            </h2>
            <div className="columns is-vcentered">
              <div
                className="column is-half
is-offset-one-quarter"
              >
                <ul className="has-text-left is-size-5 offer-list">
                  <li>
                    <div className="card">
                      1:1 or 1:2 skype lesson, so it means you can take classes
                      from anywhere.
                    </div>
                  </li>
                  <li>
                    <div className="card">
                      Interactive excersices and activities.
                    </div>
                  </li>
                  <li>
                    <div className="card">
                      Technology-enhanced learning experience.
                    </div>
                  </li>
                  <li>
                    <div className="card">
                      Interactive mobile applications, that faciliate learning
                      and reinforce knowledge.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offer;
