import React from "react";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      email: "",
    },
    loading: false,
    errors: {},
  };

  onChange = (e) =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(() =>
          this.setState({ errors: "Email address not found", loading: false })
        );
    }
  };

  validate = (data) => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <div negative>{errors}</div>}
        <div error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </div>
        <input type="button" title="Send" />
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
