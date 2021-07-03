import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class TrackForm extends React.Component {
  state = {
    data: {
      id: this.props.track.id,
      date: this.props.track.date,
      distance: this.props.track.distance,
      time: this.props.track.time,
    },
    index: 0,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        id: props.track.id,
        date: props.track.title,
        distance: props.track.distance,
        time: props.track.time,
      },
    });
  }

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
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };


  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.distance) errors.distance = "Can't be blank";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.date}>
                  <label htmlFor="date">Track date</label>
                  <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={data.date}
                    onChange={this.onChange}
                  />
                  {errors.date && <InlineError text={errors.date} />}
                </Form.Field>

                <Form.Field error={!!errors.distance}>
                  <label htmlFor="float">Track distance</label>
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

                <Form.Field error={!!errors.time}>
                  <label htmlFor="time">Jogging time</label>
                  <input
                    type="number"
                    id="time"
                    name="time"
                    value={data.time}
                    onChange={this.onChange}
                  />
                  {errors.time && <InlineError text={errors.time} />}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

TrackForm.propTypes = {
  submit: PropTypes.func.isRequired,
  track: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    distance: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired
};

export default TrackForm;
