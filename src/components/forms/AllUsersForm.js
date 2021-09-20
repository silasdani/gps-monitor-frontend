import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

class AllUsersForm extends React.Component {
  state = {
    loading: false,
    users: [],
  };
  componentDidMount = () => this.onInit(this.props);
  onInit = () => {
    this.setState({ loading: true });
    this.props.submit().then(() => {
      this.setState({ loading: false });
      this.setState({ loading: false, users: Object.values(this.props.users) });
    });
  };

  render() {
    return (
      <div className="ui container">
        <Card.Group className="centered">
          {this.state.users.map((element) => (
            <Card>
              <Card.Content textAlign="left">
                <Image
                  floated="right"
                  size="small"
                  src={"https://i.pravatar.cc/150?u=" + element.id}
                />
                <Card.Header>
                  #{element.id} <br /> {element.attributes.name}
                </Card.Header>
                <Card.Description>
                  <p>
                    <strong>Id: #</strong>
                    {element.id}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {element.attributes.email}
                  </p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button circular positive href={"/users/edit/" + element.id}>
                  <i className="icon settings"></i> EDIT
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default AllUsersForm;
