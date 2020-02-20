import React from "react";
import { Link } from "react-router-dom";

const Service = () => {
  const margin = {
    marginTop: "50px",
    marginBottom: "50px"
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
                <div className="service-box">
                  <h3 className="has-text-centered" style={{ padding: "20px" }}>
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
                  <div
                    className="has-text-centered"
                    style={{ marginTop: "15px" }}
                  >
                    <Link to="/" className="button is-info">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="service-box">
                  <h3 className="has-text-centered" style={{ padding: "20px" }}>
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
                  <div
                    className="has-text-centered"
                    style={{ marginTop: "15px" }}
                  >
                    <Link to="/detailed/russian" className="button is-info">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="service-box">
                  <h3 className="has-text-centered" style={{ padding: "20px" }}>
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
                  <div
                    className="has-text-centered"
                    style={{ marginTop: "15px" }}
                  >
                    <Link to="/" className="button is-info">
                      Learn more
                    </Link>
                  </div>
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
