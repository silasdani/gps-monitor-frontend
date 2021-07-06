import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/auth";

const TopNavigation = ({ user, logout }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
    {
      <Menu.Item as={Link} to="/tracks/new">
        Add New Track
      </Menu.Item>
    }

    {(user.admin || user.manager) && (
      <Menu.Item as={Link} to="/users">
        Manage Users
      </Menu.Item>
    )}

    <Menu.Menu position="right">
      <h2>{user.name}</h2>
      <Dropdown
        trigger={
          <Image
            floated="right"
            size="mini"
            src={"https://i.pravatar.cc/150?u=" + localStorage.name}
          />
        }
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
