import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
// Account
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
//Navigation
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from "./components/navigation/TopNavigation";
//Tracks
import DashboardPage from "./components/pages/DashboardPage";
import EditTrackPage from "./components/pages//EditTrackPage";
import NewTrackPage from "./components/pages//NewTrackPage";
//Users
import { AllUsersPage, EditUserPage, AllTracksPage, WeeklyReportPage } from "./components/pages";
import MyMap from "./components/MyMap";

const App = ({ location }) => (

  <React.Fragment>
    <TopNavigation />
    <MyMap />
    <Route location={location} path="/" exact component={HomePage} />
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
      path="/dashboard"
      exact
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      path="/tracks/new"
      exact
      component={NewTrackPage}
    />
    <UserRoute
      location={location}
      path="/tracks/edit/:id"
      exact
      component={EditTrackPage}
    />
    <UserRoute
      location={location}
      path="/users"
      exact
      component={AllUsersPage}
    />
    <UserRoute
      location={location}
      path="/users/edit/:id"
      exact
      component={EditUserPage}
    />

    <UserRoute
      location={location}
      path="/tracks/all"
      exact
      component={AllTracksPage}
    />

    <UserRoute
      location={location}
      path="/weekly"
      exact
      component={WeeklyReportPage}
    />
  </React.Fragment>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired
};


export default connect()(App);
