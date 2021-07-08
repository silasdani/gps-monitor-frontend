import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import api from "../../api";
class EditDeleteTrackForm extends React.Component {
  state = {
    data: {
      name: "",
      email: "",
      admin: false,
      manager: false,
      activated: true,
      password_digest: "",
      remember_digest: "",
    },
    loading: false,
    errors: {},
  };

  componentDidMount() {
    const id = this.props.id;
    this.setState({ loading: true });
    api.users.getData(id).then((data) => {
      this.setState({ loading: false, data });
    });
  }

  onChange = (e) =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(() => this.setState({ loading: false }));
    }
  };

  validate = (data) => {
    const errors = {};
    if (data.name === "") errors.name = "Name can't be blank";
    if (data.admin !== false || data.admin !== true)
      errors.admin = "Field is not a boolean";
    if (data.manager !== false || data.manager !== true)
      errors.manager = "Field is not a boolean";
    if (data.activated !== false || data.activated !== true)
      errors.activated = "Field is not a boolean";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={this.onChange}
          />
        </Form.Field>
        {errors.name && <InlineError text={errors.name}/>}

        <Form.Field>
          <label htmlFor="email">Name</label>
          <input
            type="text"
            id="email"
            name="email"
            value={data.email}
            disabled={true}
          />
        </Form.Field>

        <Form.Field>
          <label htmlFor="float">Distance (Km)</label>
          <input
            type="number"
            id="distance"
            name="distance"
            placeholder="km"
            value={data.distance}
            onChange={this.onChange}
          />
          {errors.distance && <InlineError text={errors.distance} />}
        </Form.Field>

        <Form.Field>
          <label htmlFor="admin">Admin</label>
          <input
            type="boolean"
            id="admin"
            name="admin"
            value={data.admin}
            onChange={this.onChange}
          />
          {errors.admin && <InlineError text={errors.admin} />}
        </Form.Field>

        <Form.Field>
          <label htmlFor="manager">Manager</label>
          <input
            type="boolean"
            id="manager"
            name="manager"
            value={data.manager}
            onChange={this.onChange}
          />
          {errors.manager && <InlineError text={errors.manager} />}
        </Form.Field>

        <Form.Field>
          <label htmlFor="activated">Activated</label>
          <input
            type="boolean"
            id="activated"
            name="activated"
            value={data.activated}
            onChange={this.onChange}
          />
          {errors.activated && <InlineError text={errors.activated} />}
        </Form.Field>


        <Button primary>Update</Button>
      </Form>
    );
  }
}

EditDeleteTrackForm.propTypes = {
  submit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default EditDeleteTrackForm;
