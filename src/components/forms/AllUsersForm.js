import React from "react";
import { UserContainer } from "../UserContainer";
class AllUsersForm extends React.Component {
  state = {
    loading: false,
    users: [],
  };
  componentDidMount = () => this.onInit(this.props);
  onInit = () => {
    this.setState({ loading: true });
    this.props.submit().then(() => {
      this.setState({ loading: false, users: Object.values(this.props.users) });
    });
  };

  render() {
    return (<div className="flex flex-rows flex-wrap justify-around mim-w-sm">
      {this.state.users.map((user) => (<UserContainer user={user} />))}
    </div>)
  }
}
export default AllUsersForm;
