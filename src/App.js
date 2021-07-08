import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
// Accocount
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
import AllUsersPage from "./components/pages/AllUsersPage";
import EditUserPage from "./components/pages/EditUserPage";

const App = ({ location, isAuthenticated }) => (
  <div>
    {<TopNavigation />}
    <div className="ui container centered
     row column padding-reset ui medium message page grid">
      <Route location={location} path="/" exact component={HomePage} />
      <Route
        location={location}
        path="/confirmation/:token"
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
        path="/users/:id"
        exact
        component={EditUserPage}
      />
    </div>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.remember_digest,
  };
}

export default connect(mapStateToProps)(App);
