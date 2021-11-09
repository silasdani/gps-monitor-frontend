import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/auth";



const TopNavigation = ({ user, logout, home, isAuthenticated }) => (
  <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
  <nav class="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
    <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
      <div class="flex items-center justify-between w-full md:w-auto">
        <a href="/">
          <span class="sr-only">Workflow</span>
          <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" />
        </a>
        <div class="-mr-2 flex items-center md:hidden">
          <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            {/* <!-- Heroicon name: outline/menu --> */}
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
      <a href="/weekly" class="font-medium text-gray-500 hover:text-gray-900">Insights</a>

      <a href="/tracks/new" class="font-medium text-gray-500 hover:text-gray-900">Features</a>

      <a href="/users" class="font-medium text-gray-500 hover:text-gray-900">Users</a>

      <a href="/signup" class="font-medium text-gray-500 hover:text-gray-900">Sign Up</a>

      <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Log in</a>

      <button class="font-medium float-right text-indigo-600 hover:text-indigo-500" onClick={() => (logout())}>Log out</button>
    </div>
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
  //         <Dropdown.Menu>
  //           <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
  //         </Dropdown.Menu>
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
