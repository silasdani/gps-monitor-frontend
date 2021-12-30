import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { LoginPage, SignupPage, ConfirmationPage, ForgotPasswordPage, ResetPasswordPage, DashboardPage, EditUserPage } from "./components/pages";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from "./components/navigation/TopNavigation";
import MyMap from "./components/MyMap";

const App = ({ location }) => (

  <React.Fragment>
    <TopNavigation />
    <MyMap />
    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={DashboardPage}
    />
    <Route
      location={location}
      path={"/confirmation/:token/:action"}
      exact
      component={ConfirmationPage}
    />
    <GuestRoute
      location={location}
      path="/login"
      exact
      component={LoginPage}
    />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <GuestRoute
      location={location}
      path="/forgot_password"
      exact
      component={ForgotPasswordPage}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
    <UserRoute
      location={location}
      path="/users"
      exact
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      path="/users/edit/:id"
      exact
      component={EditUserPage}
    />
  </React.Fragment>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired
};


export default connect()(App);
