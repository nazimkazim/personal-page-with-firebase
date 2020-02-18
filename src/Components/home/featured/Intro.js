import React from "react";
import RubberBand from "react-reveal/RubberBand";

const Intro = () => {
  return (
    <div>
      <section className="hero is-fullheight" style={{ background: "#20beee" }}>
        <div className="hero-body">
          <div className="container">
            <RubberBand>
              <h1 className="title-name-custom" style={{ color: "#021420" }}>
                Professional English and Russian teacher
              </h1>
            </RubberBand>
            <h1 className="subtitle-prof-custom is-uppercase">
              Educational Technology Software Developer
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intro;
