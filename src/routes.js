import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/home';
import Experience from './Components/experience/Experience';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={Experience} path="/my_experience" />
      </Switch>
    </Layout>
  );
};

export default Routes;
