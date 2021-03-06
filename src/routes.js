import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import PrivateRoutes from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';
import Home from './Components/home';
import Experience from './Components/experience/Experience';
import Projects from './Components/projects/index';
import Education from './Components/education/Education';
import SignIn from './Components/signin/index';
import Dashboard from './Components/admin/Dashboard';
import AdminExperience from './Components/admin/experience/index';
import AddEditExperience from './Components/admin/experience/addEditExperience';
import AdminEducation from './Components/admin/education/index';
import DisplayMessages from './Components/admin/messages/messages';
import addEditMainEducation from './Components/admin/education/addEditMainEducation';
import addEditAdditionalEducation from './Components/admin/education/addEditAdditionalEducation';
import AdminReviews from './Components/admin/reviews';
import AddEditReviews from './Components/admin/reviews/addEditReviews';
import AdminProjects from './Components/admin/projects/index';
import AddEditProjects from './Components/admin/projects/AddEditProjects';
import Uploadphotos from './Components/admin/photos/uploadphotos';
import DisplayPhotos from './Components/admin/photos/displayPhotos';
import AboutMeAdmin from './Components/admin/experience/about_me/index';
import EditAboutMe from './Components/admin/experience/about_me/EditAboutMe';
import RussianDetailed from './Components/russian-detailed/index';

const Routes = props => {
  //console.log(props);
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/admin_about_me"
          exact
          component={AboutMeAdmin}
        />
        <PrivateRoutes
          {...props}
          path="/admin_about_me/edit_about_me/:id"
          exact
          component={EditAboutMe}
        />
        <PrivateRoutes
          {...props}
          path="/admin_experience"
          exact
          component={AdminExperience}
        />
        <PrivateRoutes
          {...props}
          path="/admin_experience/edit_experience"
          exact
          component={AddEditExperience}
        />
        <PrivateRoutes
          {...props}
          path="/admin_experience/edit_experience/:id"
          exact
          component={AddEditExperience}
        />
        <PrivateRoutes
          {...props}
          path="/admin_education"
          exact
          component={AdminEducation}
        />
        <PrivateRoutes
          {...props}
          path="/admin_education/edit_main_education"
          exact
          component={addEditMainEducation}
        />
        <PrivateRoutes
          {...props}
          path="/admin_education/edit_additional_education"
          exact
          component={addEditAdditionalEducation}
        />
        <PrivateRoutes
          {...props}
          path="/admin_education/edit_main_education/:id"
          exact
          component={addEditMainEducation}
        />
        <PrivateRoutes
          {...props}
          path="/admin_education/edit_additional_education/:id"
          exact
          component={addEditAdditionalEducation}
        />
        <PrivateRoutes
          {...props}
          path="/admin_reviews"
          exact
          component={AdminReviews}
        />
        <PrivateRoutes
          {...props}
          path="/admin_reviews/edit_review/:id"
          exact
          component={AddEditReviews}
        />
        <PrivateRoutes
          {...props}
          path="/admin_reviews/edit_review"
          exact
          component={AddEditReviews}
        />
        <PrivateRoutes
          {...props}
          path="/admin_projects"
          exact
          component={AdminProjects}
        />
        <PrivateRoutes
          {...props}
          path="/admin_projects/edit_project"
          exact
          component={AddEditProjects}
        />
        <PrivateRoutes
          {...props}
          path="/admin_projects/edit_project/:id"
          exact
          component={AddEditProjects}
        />
        <PrivateRoutes
          {...props}
          path="/admin_photos/edit_photos"
          exact
          component={Uploadphotos}
        />
        <PrivateRoutes
          {...props}
          path="/admin_photos"
          exact
          component={DisplayPhotos}
        />
        <PrivateRoutes
          {...props}
          path="/admin_messages"
          exact
          component={DisplayMessages}
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
        <PublicRoutes
          {...props}
          restricted={false}
          path="/detailed/russian"
          exact
          component={RussianDetailed}
        />
        <Route exact component={Experience} path="/my_experience" />
        <Route exact component={Projects} path="/projects" />
        <Route exact component={Education} path="/my_education" />
      </Switch>
    </Layout>
  );
};

export default Routes;
