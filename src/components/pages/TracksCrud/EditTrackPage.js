import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import TrackForm from "../../forms/TrackForm";
import { createTrack } from "../../../actions/tracks";

class NewTrackPage extends React.Component {
  addTrack = (track) =>
    this.props
      .createTrack(track)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <Segment>
        <h1>EditPage</h1>
        <TrackForm submit={this.addTrack} />
      </Segment>
    );
  }
}

NewTrackPage.propTypes = {
  createTrack: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, { createTrack })(NewTrackPage);
