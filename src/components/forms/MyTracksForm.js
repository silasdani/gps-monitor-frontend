import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import Momemt from "moment";
import sub from "../../utils/subprograms";
import { Form, Grid, GridColumn } from "semantic-ui-react";

class MyTracksForm extends React.Component {
  state = {
    data: {
      dateFrom: "2021-05-07T00:00",
      dateTo: "2021-12-12T12:00",
    },
    loading: false,
    tracks: [],
  };
  componentDidMount = () => this.onInit(this.props);
  onInit = () => {
    this.setState({ loading: true });
    this.props.submit().then(() => {
      this.setState({ loading: false, tracks: this.props.tracks });
    });
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
      tracks: sub.tracks.filterTracksByDate(this.props.tracks, this.state.data),
    });
  };

  render() {
    const { data, loading } = this.state;
    return (
      <div className="ui container">
        <Form loading={loading}>
          <Grid centered>
            <GridColumn width={6}>
              <Form.Field>
                <label htmlFor="date">From date</label>
                <input
                  type="datetime-local"
                  id="dateTo"
                  name="dateFrom"
                  value={data.dateFrom}
                  onChange={this.onChange}
                />
              </Form.Field>
            </GridColumn>
            <GridColumn width={6}>
              <Form.Field>
                <label htmlFor="date">To date</label>
                <input
                  type="datetime-local"
                  id="dateTo"
                  name="dateTo"
                  value={data.dateTo}
                  onChange={this.onChange}
                />
              </Form.Field>
            </GridColumn>
          </Grid>
        </Form>

        <Card.Group className="centered">
          {this.state.tracks.map((element) => (
            <Card key={element.id}>
              <Card.Content textAlign="left">
                <Image
                  circular
                  floated="right"
                  size="mini"
                  src={
                    "https://i.pravatar.cc/150?u=" + element.attributes.user_id
                  }
                />
                <Card.Header>User: #{element.attributes.user_id}</Card.Header>
                <Card.Meta>
                  {Momemt(element.attributes.date).format(
                    "MMM Do YYYY, h:mm a"
                  )}
                </Card.Meta>
                <Card.Description>
                  <p>
                    <strong>Distance: </strong>
                    {sub.track.distKM(element.attributes.distance)}
                  </p>
                  <p>
                    <strong>Time: </strong>
                    {sub.track.secondsToHms(element.attributes.time)}
                  </p>
                  <p>
                    <strong>Average speed: </strong>
                    {sub.track.averageSpeed(
                      element.attributes.distance,
                      element.attributes.time
                    )}
                  </p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button circular positive href={"/tracks/edit/" + element.id}>
                  <i className="icon settings"></i> SETTINGS
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default MyTracksForm;
