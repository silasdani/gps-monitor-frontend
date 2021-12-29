import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserContainer from "../UserContainer";
import DateTimePicker from 'react-datetime-picker';
import { fetchAll } from "../../redux/ducks/userDuck"
class DashboardPage extends React.Component {
  state = {
    startTime: new Date(),
    endTime: new Date(),
    startDateError: '',
    endDateError: '',
    filtered: false,
  }

  onChangeStartDate = (ev) => {
    if (ev > this.state.endTime) {
      this.setState({
        ...this.state,
        startDateError: 'Start Time should be before end Time !'
      })
      return;
    }

    this.setState({
      ...this.state,
      startTime: ev,
      startDateError: ''
    })
  }

  onChangeEndDate = (ev) => {
    if (ev < this.state.startTime) {
      this.setState({
        ...this.state,
        endDateError: 'End Time should be after Start Time !',
      })
      return;
    }

    this.setState({
      ...this.state,
      endTime: ev,
      endDateError: ''
    })
  }

  componentDidMount = () => this.props.fetchAll();

  render() {
    const { usersAll } = this.props;
    return (
      <div>
        <div className="flex flex-row absolute h-20 mt-16  w-full justify-end space-x-10 px-10">
          <div className="w-56">
            <DateTimePicker
              className="bg-gray-50  border border-red-200 rounded-lg "
              value={this.state.startTime}
              onChange={this.onChangeStartDate}
            />
            {this.state.startDateError !== '' && <div className="text-left font-bold text-red-600">
              {this.state.startDateError}
            </div>}
          </div>
          <div className="w-56">
            <DateTimePicker
              className="bg-gray-50  border border-red-200 rounded-lg  "
              value={this.state.endTime}
              onChange={this.onChangeEndDate}
            />
            {this.state.endDateError !== '' && <div className="text-left font-bold text-red-600">
              {this.state.endDateError}
            </div>}
          </div>
          <button className={this.state.filtered ? "bg-blue-500 hover:bg-blue-700 text-pink-50 font-bold py-2 px-4 rounded z-50 h-10" : "bg-gray-500 hover:bg-gray-700 text-pink-50 font-bold py-2 px-4 rounded z-50 h-10 ml-10 "}
            onClick={() => this.setState({ ...this.state, filtered: !this.state.filtered })}
          >
            {this.state.filtered && <span>ON</span>}
            {!this.state.filtered && <span>OFF</span>}
          </button>
        </div>
        <div className="flex flex-col max-w-sm max-h-screen overflow-y-auto pt-16">
          <div className="z-20 ml-16 py-5 min-h-32 max-w-32 space-y-10">
            {/* {usersAll?.map((user) => (
              <UserContainer
                user={user}
                filtered={this.state.filtered}
                startTime={this.state.startTime}
                endTime={this.state.endTime} />
            ))} */}
          </div>
          {usersAll?.length === 0 && <div className="z-20 ml-16 py-5 min-h-32 max-w-32 space-y-10">
            <UserContainer user={this.props.user} />
          </div>}
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  fetchAll: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const usersAll = [];
  const { user } = state.session;
  return {
    user,
    usersAll,
  };
}

export default connect(mapStateToProps, { fetchAll })(DashboardPage);
