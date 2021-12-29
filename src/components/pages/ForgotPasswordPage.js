import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import { resetPasswordRequest } from "../../redux/ducks/userDuck"

class ForgotPasswordPage extends React.Component {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <div>
        <h1>Forgot Password</h1>
        {this.state.success ? (
          <div>Email has been sent.</div>
        ) : (
          <ForgotPasswordForm submit={this.submit} />
        )}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
