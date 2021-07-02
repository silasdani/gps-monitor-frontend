import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

// TODO: change some style
const AddTrackCtA = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Add new track</Card.Header>
      <Link to="/tracks/new">
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
);

export default AddTrackCtA;
