import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../actions/tracks";
import MyTracksForm from "../forms/MyTracksForm";

class AllTracksPage extends React.Component {
  submit = () =>
    this.props
      .fetchAllTracks()
      .then(() => this.props.history.push("/tracks/all"));

  render() {
    const { tracksAll, isAdmin } = this.props;

    return (
      <div>
        <h1>All Tracks</h1>
        {isAdmin && <MyTracksForm submit={this.submit} tracks={tracksAll} />}
      </div>
    );
  }
}

AllTracksPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  tracksAll: PropTypes.array.isRequired,
  fetchAllTracks: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    isAdmin: !!state.user.admin,
    tracksAll: Object.values(state.tracks),
  };
}

export default connect(mapStateToProps, { fetchAllTracks })(AllTracksPage);
