import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { editUser, deleteUser } from "../../actions/users";
import EditDeleteUserForm from "../forms/EditDeleteUserForm";

class EditUserPage extends React.Component {
  submit = (user) =>
    this.props
      .editUser(user, this.props.match.params.id)
      .then(() => this.props.history.push("/users"));

  delete = () => {
    this.props
      .deleteUser(this.props.match.params.id)
      .then(() => this.props.history.push("/users"));
  };
  render() {
    const id = this.props.match.params.id;
    return (
      <div>
        <h1>User #{id}</h1>
        <EditDeleteUserForm submit={this.submit} id={id} />
        <Button
          disabled={id === localStorage.id}
          negative
          onClick={this.delete}
        >
          Delete
        </Button>
      </div>
    );
  }
}

EditUserPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect({ editUser, deleteUser })(EditUserPage);
