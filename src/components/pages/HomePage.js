import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";

const HomePage = ({ isAuthenticated, logout }) => (
  <React.Fragment Style="text-align: center;">
    <h2>Home</h2>
    <h3>
      This is a website used to track the time records of it's users activity.
    </h3>
    {isAuthenticated ? (
      <div>
        <button className="ui blue button" onClick={() => logout()}>
          Log out »
        </button>
      </div>
    ) : (
      <div>
        <a className="ui blue button" href="/login">
          Login »
        </a>
        <a className="ui blue button" href="/signup">
          Sign up »
        </a>
      </div>
    )}
  </React.Fragment >
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.remember_digest,
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
