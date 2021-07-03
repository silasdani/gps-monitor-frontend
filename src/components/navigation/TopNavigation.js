import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/auth";
import { allTracksSelector } from "../../reducers/tracks";

const TopNavigation = ({ user, logout, hasTracks }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
    {hasTracks && (
      <Menu.Item as={Link} to="/tracks/new">
        Add New Track
      </Menu.Item>
    )}

    <Menu.Menu position="right">
      
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  hasTracks: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    hasTracks: allTracksSelector(state).length > 0
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
