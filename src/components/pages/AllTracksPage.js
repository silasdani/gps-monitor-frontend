import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../actions/tracks";
import MyTracksForm from "../forms/MyTracksForm";

class AllTracksPage extends React.Component {
  submit = () =>
    this.props
      .fetchAllTracks()
      .then(() => this.props.history.push("/tracks/all"));

  render() {
    const records = this.props.tracksAll;

    return (
      <div>
        <h1>All Tracks</h1>
        <MyTracksForm submit={this.submit} tracks={records} />
      </div>
    );
  }
}

AllTracksPage.propTypes = {};

function mapStateToProps(state) {
  return {
    tracksAll: Object.values(state.tracks),
  };
}

export default connect(mapStateToProps, { fetchAllTracks })(AllTracksPage);
