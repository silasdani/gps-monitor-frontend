import LocationService from '../../services/LocationService'
import LocationSerializer from '../../Serializers/LocationSerializer';

export const LOCATIONS_FETCHED = "LOCATIONS_FETCHED";
export const LOCATIONS_FETCHED_FAILED = "LOCATIONS_FETCHED_FAILED";
export const LOCATION_CREATED = "LOCATION_CREATED";
export const LOCATION_DELETED = "LOCATION_DELETED";
export const CLEAR_LOCATION_STATE = "CLEAR_LOCATION_STATE";

const locationsFetched = (data) => ({
    type: LOCATIONS_FETCHED,
    data
});

const locationsFetchedFailed = (data) => ({
    type: LOCATIONS_FETCHED_FAILED,
    data
});

export const clearLocationState = () => ({
    type: CLEAR_LOCATION_STATE
});

export const fetchUserLocationsByDate = (id, date) => (dispatch) => {
    return new LocationService().fetchUserLocationsByDate(id, date)
        .then((locations) => {
            if (Array.isArray(locations)) {
                dispatch(locationsFetched(LocationSerializer.deserialize(locations)))
            }
        })
        .catch(res => dispatch(locationsFetchedFailed(res)));
}

export const fetchUserLocations = (id) => (dispatch) => {
    return new LocationService().fetchUserLocations(id)
        .then((locations) => {
            if (Array.isArray(locations)) {
                dispatch(locationsFetched(LocationSerializer.deserialize(locations)))
            } else {
                dispatch(locationsFetchedFailed(locations.message))
            }
        })
        .catch(res => dispatch(locationsFetchedFailed(res)));
}

const DEFAULT_STATE = {
    currentLocation: {},
    locations: []
}

const location = (state = {}, action = {}) => {
    switch (action.type) {
        case LOCATIONS_FETCHED:
            return {
                ...state,
                locations: action.data
            }
        case CLEAR_LOCATION_STATE:
            return DEFAULT_STATE;
        default:
            return state;
    }
}

export default location;



