import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../redux/ducks/sessionDuck";

const TopNavigation = ({ user, logout, home, isAuthenticated }) => (
  <div className="z-50 absolute w-full">
    <nav className="flex items-center flex-wrap bg-blue-500 px-6 z-50" aria-label="Global">
      <div className="text-lg flex-grow">
        {isAuthenticated && <a href="/users" className="inline-block mt-0 text-blue-200 hover:text-white mr-4 font-extrabold border-2 p-2 rounded-lg">MAP</a>}
        {!isAuthenticated && <a href="/signup" className="inline-block mt-0 text-blue-200 hover:text-white mr-4 font-serif font-bold">SIGN UP</a>}
        {!isAuthenticated && <a href="/login" className="inline-block text-blue-200 hover:text-white mr-4 border-2 m-2 p-1 font-serif font-bold   rounded-lg">LOG IN</a>}
        {isAuthenticated && <button className="inline-block mt-0 text-blue-200 hover:text-white mr-4" onClick={() => (logout())}>LOG OUT</button>}
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

export default connect(mapStateToProps, { logout })(TopNavigation);
