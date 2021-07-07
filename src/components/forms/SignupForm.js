import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
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
      this.props.submit(this.state.data).catch((err) => {
        console.warn(err);
        this.setState({ errors: err.data.data.error, loading: false });
      });
    }
  };

  validate = (data) => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.password_confirmation)
      errors.password = "Passwords do not match";
    if(!data.name) errors.name = "Can't be blank";

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <div>
        <h1>Sign up</h1>
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.name}>
          <label htmlFor="text">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={this.onChange}
          />
          {errors.name && <InlineError text={errors.name} />}
        </Form.Field>

        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@email.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            placeholder="at least 6 characters"
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Form.Field error={!!errors.password_confirmation}>
          <label htmlFor="password">Password confirmation</label>
          <input
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
        </Form.Field>

        <Button primary>Sign Up</Button>
      </Form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SignupForm;
