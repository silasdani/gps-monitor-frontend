import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../redux/ducks/sessionDuck";

const TopNavigation = ({ user, logout, isAdmin, isAuthenticated }) => (
  <div className="z-40 absolute w-full">
    <nav className="flex items-center flex-wrap bg-blue-500 pr-6 z-40" aria-label="Global">
      <div className="text-lg flex-grow">
        {isAdmin && <div className="inline-block text-blue-50 bg-red-500 p-4 ml-0 animate-pulse font-serif font-bold">ADMIN</div>}
        {isAuthenticated && <a href="/users" className="inline-block text-blue-50 hover:text-white ml-10 border-2 m-2 p-1 font-serif font-bold rounded-lg">MAP</a>}
        {!isAuthenticated && <a href="/signup" className="inline-block mt-0 text-blue-50 hover:text-white mr-4 ml-10 font-serif font-bold">SIGN UP</a>}
        {!isAuthenticated && <a href="/login" className="inline-block text-blue-50 hover:text-white mr-4 border-2 m-2 p-1 font-serif font-bold rounded-lg">LOG IN</a>}
        {isAuthenticated && <button className="inline-block text-blue-50 hover:text-white font-serif m-2 p-1 font-bold float-right" onClick={() => (logout())}>LOG OUT</button>}
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
    isAuthenticated: state.session.signedIn,
    isAdmin: state.session.user.admin,
    home: "/",
  };
}

export default connect(mapStateToProps, { logout })(TopNavigation);
