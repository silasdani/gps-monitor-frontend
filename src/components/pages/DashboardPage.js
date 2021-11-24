import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/users";
import UserContainer from "../UserContainer";

class DashboardPage extends React.Component {

  componentDidMount = () => this.props.fetchUsers();

  render() {
    const { isManagerOrAdmin, usersAll } = this.props;
    return (
      <div className="flex flex-col max-w-sm max-h-screen overflow-y-auto pt-16">
        {isManagerOrAdmin && (
          <div className="z-20 ml-16 py-5 min-h-32 max-w-32 space-y-10">
            {usersAll?.map((user) => (<UserContainer user={user} />))}
          </div>
        )}
        {usersAll?.length === 0 && <div className="z-20 ml-16 py-5 min-h-32 max-w-32 space-y-10">
          <UserContainer user={this.props.user} />
        </div>}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isManagerOrAdmin: PropTypes.bool.isRequired,
  usersAll: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const usersAll = Object.values(state.users);
  const me = { attributes: state?.user };
  return {
    isManagerOrAdmin: !!state.user.manager || !!state.user.admin,
    user: me,
    usersAll,
  };
}

export default connect(mapStateToProps, { fetchUsers })(DashboardPage);
