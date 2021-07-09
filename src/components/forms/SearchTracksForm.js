import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, GridColumn } from "semantic-ui-react";
class TrackForm extends React.Component {
  state = {
    data: {
      dateFrom: "1900-01-01T00:00",
      dateTo: "2081-01-01T00:00"
    },
    loading: false,
    errors: {},
  };

  onChange = (e) =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = () => {
    this.setState({ loading: true });
    this.props
      .submit(this.state.data)
      .then(() => this.setState({ loading: false }));
  };

  render() {
    const { data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Grid>
          <GridColumn width={6}>
            <Form.Field>
              <label htmlFor="date1">From date</label>
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
              <label htmlFor="date2">To date</label>
              <input
                type="datetime-local"
                id="dateTo"
                name="dateTo"
                value={data.dateTo}
                onChange={this.onChange}
              />
            </Form.Field>
          </GridColumn>

          <GridColumn width={2}>
            <br />
            <Button secondary>Filter</Button>
          </GridColumn>
        </Grid>
      </Form>
    );
  }
}

TrackForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default TrackForm;
