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
    // se trimite formularul catre loginPages
    const errors = this.validate(this.state.data); // se valideaza datele
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      // daca nu avem erori, facem request
      this.setState({ loading: true });
      this.props
        .submit(this.state.data) // se trimit credentialele carte auth
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
      <div>
        <h1>Log in</h1>
        <Form onSubmit={this.onSubmit} loading={loading}>
          {errors.global && (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors.global}</p>
            </Message>
          )}
          <Form.Field error={!!errors.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
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
              placeholder="password"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Button primary>Login</Button>
        </Form>
        <Link to="/forgot_password">Forgot Password?</Link>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginForm;
