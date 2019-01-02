import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import PrivateRoutes from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';

import Home from './Components/home';
import Experience from './Components/experience/Experience';
import SignIn from './Components/signin/index';
import Dashboard from './Components/admin/Dashboard';
import AdminExperience from './Components/admin/experience/index';
import AddEditExperience from './Components/admin/experience/addEditExperience';

const Routes = props => {
  console.log(props);
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/admin_experience"
          exact
          component={AdminExperience}
        />
        <PrivateRoutes
          {...props}
          path="/admin_experience/edit_experience/:id"
          exact
          component={AddEditExperience}
        />
        <PrivateRoutes
          {...props}
          restricted={true}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <PublicRoutes
          component={Home}
          restricted={false}
          {...props}
          path="/"
          exact
        />
        <PublicRoutes
          {...props}
          restricted={true}
          path="/sign_in"
          exact
          component={SignIn}
        />
        <Route exact component={Experience} path="/my_experience" />
      </Switch>
    </Layout>
  );
};

export default Routes;
