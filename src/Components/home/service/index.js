import React from 'react';
import bckImg from './../../../Resources/images/bckImg.jpg';

const Service = () => {
  const serviceCardStyle = {
    width: '300px',
    height: '300px',
    margin: '0 auto',
    backgroundColor: 'hsl(0, 0%, 86%)'
  };

  const filteredBck = {
    backgroundImage: `url(${bckImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'cover'
  };

  const margin = {
    marginTop: '50px',
    marginBottom: '50px'
  };

  const cardBck = {
    backgroundColor: 'hsl(0, 0%, 71%)'
  };

  return (
    <div>
      <section class="hero has-background-white-ter is-fullheight">
        <div class="hero-body">
          <div class="container">
            <h2
              className="has-text-centered is-size-2 has-text-info has-text-weight-semibold is-uppercase"
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
                </div>
              </div>
              <div className="column">
                <div style={serviceCardStyle}>
                  <h3 className="has-text-centered" style={{ padding: '30px' }}>
                    <span className="is-size-3 is-uppercase has-text-weight-bold">
                      Russian
                    </span>
                  </h3>
                </div>
              </div>
              <div className="column">
                <div style={serviceCardStyle}>
                  <h3 className="has-text-centered" style={{ padding: '30px' }}>
                    <span className="is-size-3 is-uppercase has-text-weight-bold">
                      Programming
                    </span>
                  </h3>
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
