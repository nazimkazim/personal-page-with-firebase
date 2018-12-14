import React, { Component } from 'react';
import RubberBand from 'react-reveal/RubberBand';

const Intro = () => {
  return (
    <div>
      <section className="hero has-background-black-bis is-fullheight">
        <div className="hero-body">
          <RubberBand>
            <span className="title-name-custom">Nazim Turdiyev</span>
            <span className="subtitle-prof-custom">Educator</span>
          </RubberBand>
        </div>
      </section>
    </div>
  );
};

export default Intro;
