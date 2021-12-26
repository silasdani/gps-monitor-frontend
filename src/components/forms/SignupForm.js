import React from "react";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class SignupForm extends React.Component {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
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
      this.props.submit(this.state.data)
        .catch((err) => {
          this.setState({ errors: err?.data?.error, loading: false });
        });
    }
  };

  validate = (data) => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    if (data.password.length < 6)
      errors.password = "Al least 6 characters required";
    if (data.password !== data.password_confirmation)
      errors.password_confirmation = "Passwords do not match";
    if (!data.name) errors.name = "Can't be blank";

    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div className="container">
        <form className="form">
          <h1>Sign up</h1>
          <div className="mb-4">
            <label className="label" htmlFor="text">Name</label>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={this.onChange}
            />
            {errors.name && <InlineError text={errors.name} />}
          </div>

          <div className="mb-4">
            <label className="label" htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              placeholder="email@email.com"
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </div>

          <div className="mb-4">
            <label className="label" htmlFor="password">Password</label>
            <input
              className="pass-input"
              type="password"
              id="password"
              name="password"
              value={data.password}
              placeholder="at least 6 characters"
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </div>

          <div className="mb-4">
            <label className="label" htmlFor="password">Password confirmation</label>
            <input
              className="pass-input"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={data.password_confirmation}
              placeholder="re-enter password"
              onChange={this.onChange}
            />
            {errors.password_confirmation && (
              <InlineError text={errors.password_confirmation} />
            )}
          </div>

          <button className="button focus:outline-none focus:shadow-outline" type="button" onClick={this.onSubmit}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SignupForm;
