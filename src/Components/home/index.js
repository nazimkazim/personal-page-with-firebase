import React from 'react';
import Intro from './featured/Intro';
import Bio from './Bio/Bio';
import Service from './service/index';
import Review from './review/index';
import Offer from './offer/index';

const Home = () => {
  return (
    <div>
      <Intro />
      <Bio />
      <Service />
      <Offer />
      <Review />
    </div>
  );
};

export default Home;
