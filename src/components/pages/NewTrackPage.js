import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import axios from "axios";
import SearchTrackForm from "../forms/SearchTrackForm";
import TrackForm from "../forms/TrackForm";
import { createTrack } from "../../actions/tracks";

class NewTrackkPage extends React.Component {
  state = {
    track: null
  };

  onTrackSelect = track => {
    this.setState({ track });
    axios
      .get(`/api/tracks/fetchPages?goodreadsId=${track.goodreadsId}`)
      .then(res => res.data.pages)
      .then(pages => this.setState({ track: { ...track, pages } }));
  };

  addTrack = track =>
    this.props
      .createTrack(track)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <Segment>
        <h1>Add new track to your collection</h1>
        <SearchTrackForm onTrackSelect={this.onTrackSelect} />

        {this.state.track && (
          <TrackForm submit={this.addTrack} track={this.state.track} />
        )}
      </Segment>
    );
  }
}

NewTrackkPage.propTypes = {
  createTrack: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { createTrack })(NewTrackkPage);
