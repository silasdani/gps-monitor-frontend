import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/auth";

const TopNavigation = ({ user, logout, home, isAuthenticated }) => (
  <div className="z-50">
    <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6 z-50" aria-label="Global">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
        <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {isAuthenticated && <a href="/weekly" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Weekly Report</a>}
          {isAuthenticated && <a href="/tracks/new" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Add New Track</a>}
          {isAuthenticated && <a href="/users" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Users</a>}
          {!isAuthenticated && <a href="/signup" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Sign Up</a>}
          {!isAuthenticated && <a href="/login" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Log in</a>}
          {isAuthenticated && <button class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4" onClick={() => (logout())}>Log out</button>}
        </div></div>
    </nav>
  </div>
  // <Menu pointing className="from-fuchsia-500 to-purple-600">
  //   {
  //     <Menu.Item className="active item red" as={Link} to={home}>
  //       Jogging App
  //     </Menu.Item>
  //   }
  //   {isAuthenticated && (
  //     <Menu.Item as={Link} to="/weekly">
  //       Weekly Report
  //     </Menu.Item>
  //   )}
  //   {!isAuthenticated && (
  //     <Menu.Menu position="right">
  //       <Menu.Item as={Link} to="/login">
  //         Log in
  //       </Menu.Item>

  //       <Menu.Item as={Link} to="/signup" position="right">
  //         Sign up
  //       </Menu.Item>
  //     </Menu.Menu>
  //   )}
  //   {isAuthenticated && (
  //     <Menu.Menu>
  //       <Menu.Item as={Link} to="/tracks/new">
  //         Add New Track
  //       </Menu.Item>

  //       {user.admin && (
  //         <Menu.Item as={Link} to="/tracks/all">
  //           Manage All Tracks
  //         </Menu.Item>
  //       )}
  //       {(user.admin || user.manager) && (
  //         <Menu.Item as={Link} to="/users">
  //           Manage Users
  //         </Menu.Item>
  //       )}
  //     </Menu.Menu>
  //   )}
  //   {isAuthenticated && (
  //     <Menu.Menu position="right">
  //       <h4>{user.name}</h4>
  //       <Dropdown
  //         trigger={
  //           <Image
  //             className="circular"
  //             floated="right"
  //             size="mini"
  //             src={"https://i.pravatar.cc/150?u=" + user.id}
  //           />
  //         }
  //       >
  //       </Dropdown>
  //     </Menu.Menu>
  //   )}
  // </Menu>
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
