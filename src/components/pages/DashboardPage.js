import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { fetchTracks } from "../../actions/tracks";
import MyTracksForm from "../forms/MyTracksForm";
import SearchTracksForm from "../forms/SearchTracksForm";

class DashboardPage extends React.Component {
  submit = () => 
  this.props.fetchTracks().then(() => this.props.history.push("/dashboard"));

  render() {
    const { isConfirmed, records } = this.props;
    return (
      <div>
        <h1>My Tracks</h1>
        {!isConfirmed && <ConfirmEmailMessage />}
        
        <SearchTracksForm />


        <MyTracksForm submit={this.submit} tracks={records}/>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  records: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.activated,
    records: state.tracks
  };
}

export default connect(mapStateToProps, { fetchTracks })(DashboardPage);
