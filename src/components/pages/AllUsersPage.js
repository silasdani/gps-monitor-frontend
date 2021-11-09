import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/users";
import { UserContainer } from "../UserContainer";

class AllUsersPage extends React.Component {

  componentDidMount = () => this.props.fetchUsers();

  render() {
    const { isManagerOrAdmin, usersFirstHalf, usersSecondHalf } = this.props;
    return (
      <div className="grid grid-cols-2 g">
        {isManagerOrAdmin && (
          <div className="flex flex-col max-h-screen overflow-y-auto ml-0 justify-self-start">
            {usersFirstHalf.map((user) => (<UserContainer user={user} left={true} />))}
          </div>
        )}
        {isManagerOrAdmin && (
          <div className="flex flex-col max-h-screen overflow-y-auto mr-0 justify-self-end" >
            {usersSecondHalf.map((user) => (<UserContainer user={user} right={true} />))}
          </div>
        )}
      </div>
    );
  }
}

AllUsersPage.propTypes = {
  isManagerOrAdmin: PropTypes.bool.isRequired,
  usersAll: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const usersAll = Object.values(state.users);

  const half = Math.ceil(usersAll.length / 2);

  const usersFirstHalf = usersAll.slice(0, half)
  const usersSecondHalf = usersAll.slice(-half)

  return {
    isManagerOrAdmin: !!state.user.manager || !!state.user.admin,
    usersFirstHalf,
    usersSecondHalf,
  };
}

export default connect(mapStateToProps, { fetchUsers })(AllUsersPage);
