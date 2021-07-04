import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import TracksTable from "../tables/TracksTable";

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? (
      <div>
        <button onClick={() => logout()}>Logout</button>
        <TracksTable />
      </div>
    ) : (
      <div>
        <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
        <TracksTable />
      </div>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!localStorage.token,
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
