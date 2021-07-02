import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Dropdown } from "semantic-ui-react";

class SearchTrackForm extends React.Component {
  state = {
    query: "",
    loading: false,
    options: [],
    tracks: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data
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
      .get(`/api/tracks/search?q=${this.state.query}`)
      .then(res => res.data.tracks)
      .then(tracks => {
        const options = [];
        const tracksHash = {};
        tracks.forEach(track => {
          tracksHash[track.goodreadsId] = track;
          options.push({
            key: track.goodreadsId,
            value: track.goodreadsId,
            text: track.title
          });
        });
        this.setState({ loading: false, options, tracks: tracksHash });
      });
  };

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a track by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchTrackForm.propTypes = {
  onTrackSelect: PropTypes.func.isRequired
};

export default SearchTrackForm;
