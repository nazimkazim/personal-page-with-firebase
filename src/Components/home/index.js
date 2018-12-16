import React from 'react';
import Intro from './featured/Intro';
import Bio from './Bio/Bio';
import Service from './service/index';

const Home = () => {
  return (
    <div>
      <Intro />
      <Bio />
      <Service />
    </div>
  );
};

export default Home;
