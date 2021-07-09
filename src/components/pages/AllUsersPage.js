import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AllUsersForm from "../forms/AllUsersForm";
import { fetchUsers } from "../../actions/users";

class AllUsersPage extends React.Component {
  submit = () =>
    this.props.fetchUsers().then(() => this.props.history.push("/users"));

  render() {
    const { isManagerOrAdmin, usersAll } = this.props;
    return (
      <div>
        <h1>All Users</h1>
        {isManagerOrAdmin && (
          <AllUsersForm submit={this.submit} users={usersAll} />
        )}
      </div>
    );
  }
}

AllUsersPage.propTypes = {
  isManagerOrAdmin: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  return {
    isManagerOrAdmin: !!state.user.manager || !!state.user.admin,
    usersAll: state.users,
  };
}

export default connect(mapStateToProps, { fetchUsers })(AllUsersPage);
