import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    loading: false,
    errors: {},
  };

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(() => {
          this.setState({
            errors: { global: "Invalid email or password" },
            loading: false,
          });
        });
    }
  };

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <div className="container">
        <form className="form">
          <h1>Log in</h1>
          {errors.global && (
            <div className="text-red-700">
              <p className="font-medium" >Something went wrong</p>
              <p>{errors.global}</p>
            </div>
          )}
          <div className="mb-4">
            <label className="label" htmlFor="email">Email</label>
            <input
              className="input focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.onChange}
            />
          </div>
          {errors.email && <InlineError text={errors.email} />}
          <div className="mb-6">
            <label className="label" htmlFor="password">Password</label>
            <input
              className="pass-input"
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </div>
          <div class="flex items-center justify-between">
            <button className="button focus:outline-none focus:shadow-outline" type="button" onClick={this.onSubmit}>
              Sign In
            </button>
            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/forgot_password">Forgot Password?</Link>
          </div>
        </form>

      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
