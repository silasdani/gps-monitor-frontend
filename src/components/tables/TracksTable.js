import React from "react";
import { Button, Table } from "semantic-ui-react";
import axios from "axios";
import Momemt from 'moment'

function distKM(d) {
  return d.toFixed(2) + " Km"
}

function averageSpeed(dist, h) {  

    var x = dist * 3600 / h;
    return x.toFixed(2) + " Km/h"
}

function secondsToHms (d){
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}
class TracksTable extends React.Component {
  state = {
    tracks: [],
  };

   

  fetchTracks = () => {
    this.setState({ loading: true });
    axios
      .get(`/tracks/`+localStorage.current_id)
      .then((res) => res.data.data)
      .then((tracks) => {
        console.warn(tracks)
        this.setState({ loading: false, tracks });
      });
  };
  render() {
    return (
        <div className="ui container">
            <br/>
        <Button primary onClick={this.fetchTracks}>Show Tracks</Button>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Distance</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Average speed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
        this.state.tracks.map(element => (
            <Table.Row>
                <Table.Cell>{Momemt(element.attributes.date).format('MMM Do YYYY')}</Table.Cell>
                <Table.Cell>{distKM(element.attributes.distance)}</Table.Cell>
                <Table.Cell>{secondsToHms(element.attributes.time)}</Table.Cell>
                <Table.Cell>{averageSpeed(element.attributes.distance, element.attributes.time)}</Table.Cell>
              </Table.Row>
    ))
          }
        </Table.Body>

        <Table.Footer>
        </Table.Footer>
      </Table>
      </div>
    );
  }
}
export default TracksTable;
