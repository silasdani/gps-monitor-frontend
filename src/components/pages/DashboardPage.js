import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allTracksSelector } from "../../reducers/tracks";
import AddTrackCtA from "../ctas/AddTrackCtA";
import { fetchTracks } from "../../actions/tracks";

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchTracks();

  render() {
    const { isConfirmed, tracks } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {tracks.length === 0 ? <AddTrackCtA /> : <p>You have tracks!</p>}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchTracks: PropTypes.func.isRequired,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    tracks: allTracksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchTracks })(DashboardPage);
