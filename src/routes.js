import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/home';
import Experience from './Components/experience/Experience';
import SignIn from './Components/signin/index';
import Dashboard from './Components/admin/Dashboard';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={Experience} path="/my_experience" />
        <Route exact component={Dashboard} path="/dashboard" />
        <Route exact component={SignIn} path="/sign_in" />
      </Switch>
    </Layout>
  );
};

export default Routes;
