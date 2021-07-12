import React from "react";
import api from "../../api";
import Momemt from "moment";
import sub from "../../utils/subprograms";
import { Tab, Card, Image } from "semantic-ui-react";

class WeeklyReportForm extends React.Component {
  state = {
    data: {
      this_week_report: {
        week: "2021-07-05",
        distance: 63,
        time: 4220,
        av_speed: 53.74407582938389,
      },
      last_week_report: {
        week: "2021-06-28",
        distance: 40.33576939081121,
        time: 11281,
        av_speed: 12.871976757993115,
      },
      week_before_last_week_report: {
        week: "2021-06-21",
        distance: 0,
        time: 0,
        av_speed: 0,
      },
    },
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });

    api.tracks.weekly_report().then((res) => {
      this.setState({ loading: false, data: res });
    });
  }

  render() {
    const loading = this.state;
    const panes = [
      {
        menuItem: "2 WEEKS AGO",
        render: () => (
          <Tab.Pane attached={false}>
            <Card.Group className="centered">
              <Card>
                <Card.Content textAlign="left">
                  <Image
                    circular
                    floated="right"
                    size="mini"
                    src="https://www.pngkey.com/png/full/334-3348246_results-logo-document-png.png"
                  />
                  <Card.Header>Two weeks ago</Card.Header>
                  <Card.Meta>
                    {Momemt(
                      this.state.data.week_before_last_week_report.week
                    ).format("MMM Do YYYY")}
                  </Card.Meta>
                  <Card.Description>
                    <p>
                      <strong>Distance: </strong>
                      {this.state.data.week_before_last_week_report.distance} Km
                    </p>
                    <p>
                      <strong>Time: </strong>
                      {sub.track.secondsToHms(
                        this.state.data.week_before_last_week_report.time
                      )}
                    </p>
                    <p>
                      <strong>Average speed: </strong>
                      {
                        this.state.data.week_before_last_week_report.av_speed
                      }{" "}
                      Km/h
                    </p>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "LAST WEEK",
        render: () => (
          <Tab.Pane attached={false}>
            <Card.Group className="centered">
              <Card>
                <Card.Content textAlign="left">
                  <Image
                    circular
                    floated="right"
                    size="mini"
                    src="https://www.pngkey.com/png/full/334-3348246_results-logo-document-png.png"
                  />
                  <Card.Header>One week ago</Card.Header>
                  <Card.Meta>
                    {Momemt(this.state.data.last_week_report.week).format(
                      "MMM Do YYYY"
                    )}
                  </Card.Meta>
                  <Card.Description>
                    <p>
                      <strong>Distance: </strong>
                      {this.state.data.last_week_report.distance} Km
                    </p>
                    <p>
                      <strong>Time: </strong>
                      {sub.track.secondsToHms(
                        this.state.data.last_week_report.time
                      )}
                    </p>
                    <p>
                      <strong>Average speed: </strong>
                      {this.state.data.last_week_report.av_speed} Km/h
                    </p>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "THIS WEEK",
        render: () => (
          <Tab.Pane attached={false}>
            <Card.Group className="centered">
              <Card>
                <Card.Content textAlign="left">
                  <Image
                    circular
                    floated="right"
                    size="mini"
                    src="https://www.pngkey.com/png/full/334-3348246_results-logo-document-png.png"
                  />
                  <Card.Header>This week</Card.Header>
                  <Card.Meta>
                    {Momemt(this.state.data.this_week_report.week).format(
                      "MMM Do YYYY"
                    )}
                  </Card.Meta>
                  <Card.Description>
                    <p>
                      <strong>Distance: </strong>
                      {this.state.data.this_week_report.distance} Km
                    </p>
                    <p>
                      <strong>Time: </strong>
                      {sub.track.secondsToHms(
                        this.state.data.this_week_report.time
                      )}
                    </p>
                    <p>
                      <strong>Average speed: </strong>
                      {this.state.data.this_week_report.av_speed} Km/h
                    </p>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        ),
      },
    ];

    return (
      <React.Fragment>
        <Tab
          loading={loading}
          menu={{ borderless: true, attached: false, tabular: false }}
          panes= { panes }
        />
      </React.Fragment>
    );
  }
}

export default WeeklyReportForm;
