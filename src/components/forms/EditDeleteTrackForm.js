import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import api from "../../api";
import moment from "moment";
class EditDeleteTrackForm extends React.Component {
  state = {
    data: {
      date: "2021-06-01T08:30",
      distance: 0,
      time: 0,
    },
    loading: false,
    errors: {},
  };

  componentDidMount() {
    const id = this.props.id;
    console.warn("Edit active on " + this.props.id);
    this.setState({ loading: true });
    api.track
      .getData(id)
      .then(
        (data) => {
          (data.date = moment(data.date).format("yyyy-MM-DDThh:mm"));
          console.warn(data.date);
          this.setState({ loading: false, data })
        }
      );
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
    if (data.time <= 0) errors.time = "Can't be 0";
    if (data.distance <= 0) errors.distance = "Can't be 0";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field>
          <label htmlFor="date">Track date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={data.date}
            onChange={this.onChange}
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
          <label htmlFor="time">Jogging time (seconds)</label>
          <input
            type="number"
            id="time"
            name="time"
            value={data.time}
            onChange={this.onChange}
          />
          {errors.time && <InlineError text={errors.time} />}
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
