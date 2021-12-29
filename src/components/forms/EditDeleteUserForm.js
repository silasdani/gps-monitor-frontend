import React from "react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";
import { connect } from "react-redux";
class EditDeleteTrackForm extends React.Component {
  state = {
    data: {
      name: "",
      email: "",
      admin: false,
      manager: false,
      activated: true,
    },
    loading: false,
    errors: {},
  };

  onChange = (e) =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onChangeForBoolean = (e) =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.checked ? true : false,
      },
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
    if (data.admin === true && data.manager === true) {
      errors.manager = "User must be either an manager or a administrator";
      errors.admin = "User must be either an administrator or a manager";
    }

    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;
    const isAdmin = this.props.isAdmin;
    return (
      <form onSubmit={this.onSubmit} loading={loading} >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={this.onChange}
          />
        </div>
        {errors.name && <InlineError text={errors.name} />}

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={data.email}
            disabled={true}
          />
        </div>

        {isAdmin && (
          <div>
            <label htmlFor="admin">Admin</label>
            <input
              type="checkbox"
              id="admin"
              name="admin"
              checked={data.admin ? "checked" : ""}
              onChange={this.onChangeForBoolean}
            />
            <br />
            {errors.admin && <InlineError text={errors.admin} />}
          </div>
        )}

        <div>
          <label htmlFor="manager">Manager</label>
          <input
            type="checkbox"
            id="manager"
            name="manager"
            checked={data.manager ? "checked" : ""}
            onChange={this.onChangeForBoolean}
          />
          <br />
          {errors.manager && <InlineError text={errors.manager} />}
        </div>

        <div>
          <label htmlFor="activated">Activated</label>
          <input
            type="checkbox"
            id="activated"
            name="activated"
            checked={data.activated ? "checked" : ""}
            onChange={this.onChangeForBoolean}
          />
          <br />
          {errors.activated && <InlineError text={errors.activated} />}
        </div>

        <input type="button" title='Update' />
      </form>
    );
  }
}

EditDeleteTrackForm.propTypes = {
  submit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    isAdmin: state.user.admin === "true" ? true : false
  };
}

export default connect(mapStateToProps)(EditDeleteTrackForm);
