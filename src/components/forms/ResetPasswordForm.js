import React from "react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      passwordConfirmation: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: "Something went wrong", loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.passwordConfirmation)
      errors.password = "Passwords must match";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <form onSubmit={this.onSubmit} loading={loading}>
        <div error={!!errors.password}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="your new password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </div>

        <div error={!!errors.passwordConfirmation}>
          <label htmlFor="passwordConfirmation">
            Confirm your new password
          </label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="type it again, please"
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation && (
            <InlineError text={errors.passwordConfirmation} />
          )}
        </div>

        <input type='button' title='Reset' />
      </form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
