import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Button } from "semantic-ui-react";
import { editTrack, deleteTrack } from "../../actions/tracks";
import EditForm from "../forms/EditDeleteTrackForm";

class EditTrackPage extends React.Component {
  submit = (track) =>
    this.props
      .editTrack(track, this.props.match.params.id)
      .then(() => this.props.history.push("/dashboard"));

  delete = () => {
    this.props
      .deleteTrack(this.props.match.params.id)
      .then(() => this.props.history.push("/dashboard"));
  };
  render() {
    const id = this.props.match.params.id;
    return (
      <Segment>
        <h1>Track #{id}</h1>
        <EditForm submit={this.submit} id={id} />
        <Button negative onClick={this.delete}>
          Delete
        </Button>
      </Segment>
    );
  }
}

EditTrackPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  editTrack: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, { editTrack, deleteTrack })(EditTrackPage);
