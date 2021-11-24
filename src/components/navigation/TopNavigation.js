import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/auth";

const TopNavigation = ({ user, logout, home, isAuthenticated }) => (
  <div className="z-50 absolute w-full">
    <nav class="flex items-center justify-between flex-wrap bg-blue-500 px-6 py-2 z-50" aria-label="Global">
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {isAuthenticated && <a href="/users" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4 font-extrabold border-2 p-2 rounded-lg">MAP</a>}
          {!isAuthenticated && <a href="/signup" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">SIGN UP</a>}
          {!isAuthenticated && <a href="/login" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4 border-2 p-2 rounded-lg">LOG IN</a>}
          {isAuthenticated && <button class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4" onClick={() => (logout())}>LOG OUT</button>}
        </div>
      </div>
    </nav>
  </div>
);

TopNavigation.propTypes = {
  logout: PropTypes.func.isRequired,
  home: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    isAuthenticated: !!state.user.remember_digest,
    home: !!state.user.remember_digest ? "/dashboard" : "/",
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
