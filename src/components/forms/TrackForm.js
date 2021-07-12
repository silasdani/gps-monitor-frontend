import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
class TrackForm extends React.Component {
  state = {
    data: {
      date: "2021-06-01T08:30",
      distance: 0,
      time: 0,
    },
    loading: false,
    errors: {},
  };

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
      this.props.submit(this.state.data).catch(() => {
        this.setState({ errors, loading: false });
      });
    }
  };

  validate = (data) => {
    const errors = {};
    if (data.time <= 0) errors.time = "Can't be 0 or negative";
    if (data.distance <= 0) errors.distance = "Can't be 0 or negative";
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
        <Button primary>Save</Button>
      </Form>
    );
  }
}

TrackForm.propTypes = {
  submit: PropTypes.func.isRequired,
  // track: PropTypes.shape({
  //   date: PropTypes.instanceOf(Date).isRequired,
  //   distance: PropTypes.number.isRequired,
  //   time: PropTypes.number.isRequired,
  // }).isRequired,
};

export default TrackForm;
