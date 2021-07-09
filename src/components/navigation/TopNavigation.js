import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/auth";

const TopNavigation = ({ user, logout, home, isAuthenticated }) => (
  <Menu pointing>
    {
      <Menu.Item className="active item" as={Link} to={home}>
        Jogging App
      </Menu.Item>
    }
    {!isAuthenticated && (
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/login">
          Log in
        </Menu.Item>

        <Menu.Item as={Link} to="/signup" position="right">
          Sign up
        </Menu.Item>
      </Menu.Menu>
    )}
    {isAuthenticated && (
      <Menu.Menu>
        <Menu.Item as={Link} to="/tracks/new">
          Add New Track
        </Menu.Item>

        {user.admin && (
          <Menu.Item as={Link} to="/tracks/all">
            Manage All Tracks
          </Menu.Item>
        )}
        {(user.admin || user.manager) && (
          <Menu.Item as={Link} to="/users">
            Manage Users
          </Menu.Item>
        )}
      </Menu.Menu>
    )}
    {isAuthenticated && (
      <Menu.Menu position="right">
        <h4>{user.name}</h4>
        <Dropdown
          trigger={
            <Image
              className="circular"
              floated="right"
              size="mini"
              src={"https://i.pravatar.cc/150?u=" + user.id}
            />
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    )}
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
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
