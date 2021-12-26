import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchUserLocations, fetchUserLocationsByDate } from '../actions/locations';

class UserContainer extends Component {
    onUserClick = () => {
        const { id } = this.props.user?.attributes;
        const { filtered, startTime, endTime } = this.props;

        if (!filtered) this.props.fetchUserLocations(id);
        else if (!!startTime && !!endTime) {
            this.props.fetchUserLocationsByDate(id, {
                date: {
                    start_time: startTime,
                    end_time: endTime
                }
            });
        }
    }

    render() {
        const { attributes } = this.props.user;
        const { name, id, email } = attributes;

        return (<button
            className={"bg-gray-100 bg-opacity-60 border border-gray-100 rounded-xl hover:border-gray-500  focus:bg-gray-200 focus:border-opacity-0"}
            onClick={this.onUserClick}
        >
            <figure className='rounded-xl'>
                <img className="rounded-full mx-auto" src={`https://i.pravatar.cc/150?u=#{id}`} alt='' />
                <div className="pt-6 text-center space-y-4">
                    <blockquote>
                        <p className="text-lg font-semibold">#{id}</p>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-cyan-600">
                            {email}
                        </div>
                        <div className="text-gray-500">
                            {name}
                        </div>
                        <a className="text-red-600" href={"/users/edit/" + id} />
                    </figcaption>
                </div>
            </figure>
        </button>
        )
    }
}

export default connect(null, { fetchUserLocations, fetchUserLocationsByDate })(UserContainer);

UserContainer.propTypes = {
    user: PropTypes.object.isRequired,
}
