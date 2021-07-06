import React from "react";
import PropTypes from "prop-types";
import { Card, Image, Button } from "semantic-ui-react";
import axios from "axios";
import Momemt from "moment";

function distKM(d) {
  return d.toFixed(2) + " Km";
}

function averageSpeed(dist, h) {
  var x = (dist * 3600) / h;
  return x.toFixed(2) + " Km/h";
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}
class TracksTable extends React.Component {
  state = {
    loading: false,
    tracks: [],
    index_track: {},
  };
  componentDidMount = () => this.onInit(this.props);
  onInit = () => {
    this.setState({ loading: true });
    this.props.submit().then(() => {
      this.setState({ loading: false });
      this.setState({ tracks: Object.values(this.props.tracks) });
    });
  };

  onDelete = (id) => {
    this.setState({ loading: true });
    axios.delete(`/tracks/` + id).then(this.setState({ loading: false }));
  };

  render() {
    return (
      <div className="ui container">
        <Card.Group className="centered">
          {this.state.tracks.map((element) => (
            <Card>
              <Card.Content textAlign="left">
                <Image
                  floated="right"
                  size="small"
                  src={"https://i.pravatar.cc/150?u=" + localStorage.name}
                />
                <Card.Header>{localStorage.name}</Card.Header>
                <Card.Meta>
                  {Momemt(element.attributes.date).format("MMM Do YYYY")}
                </Card.Meta>
                <Card.Description>
                  <p>
                    <strong>Distance: </strong>
                    {distKM(element.attributes.distance)}
                  </p>
                  <p>
                    <strong>Time: </strong>
                    {secondsToHms(element.attributes.time)}
                  </p>
                  <p>
                    <strong>Average speed: </strong>
                    {averageSpeed(
                      element.attributes.distance,
                      element.attributes.time
                    )}
                  </p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="blue"
                    href="/tracks/edit"
                    onClick={(localStorage.editID = element.id)}
                  >
                    Edit
                  </Button>
                  <Button basic color="red" onClick={this.onDelete}>
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

TracksTable.propTypes = {
  fetchTracks: PropTypes.func.isRequired,
};

export default TracksTable;
