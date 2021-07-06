import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
// import { allTracksSelector } from "../../reducers/tracks";
// import AddTrackCtA from "../ctas/AddTrackCtA";
// import { fetchTracks } from "../../actions/tracks";
import TracksTable from "../tables/TracksTable";

class DashboardPage extends React.Component {
  // componentDidMount = () => this.onInit(this.props);

  // onInit = props => props.fetchTracks()

  render() {
    const { isConfirmed } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        <TracksTable />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.activated
  };
}

export default connect(mapStateToProps, {  })(DashboardPage);
