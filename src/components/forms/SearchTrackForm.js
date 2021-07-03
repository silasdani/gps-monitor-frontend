import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Dropdown } from "semantic-ui-react";

class SearchTrackForm extends React.Component {
  state = {
    query: { date_from: Date.now(), date_to: Date.now() },
    loading: false,
    options: [],
    tracks: {},
  };

  onSearchChange = (date_from, date_to) => {
    clearTimeout(this.timer);
    this.setState({
      query: { date_from, date_to },
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onTrackSelect(this.state.tracks[data.value]);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    axios
      .get(`/api/tracks/from_to`)
      .then((res) => res.data.tracks)
      .then((tracks) => {
        this.setState({ loading: false, tracks });
      });
  };

  render() {
    return (
      <Form>
        <Form.Field>
          <label htmlFor="date">From date</label>
          <input
            type="datetime-local"
            id="date_from"
            name="date_from"
            value={this.state.query.date_from}
            onChange={this.onChange}
          />
        </Form.Field>

        <Form.Field>
          <label htmlFor="date">To date</label>
          <input
            type="datetime-local"
            id="date_to"
            name="date_to"
            value={this.state.query.date_from}
            onChange={this.onChange}
          />
        </Form.Field>

        <Dropdown
          search
          fluid
          placeholder="Search for tracks filtered by date"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchTrackForm.propTypes = {
  onTrackSelect: PropTypes.func.isRequired,
};

export default SearchTrackForm;
