import api from "../api";
import { FETCH_USER_LOCATIONS, FETCH_USER_LOCATIONS_BY_DATE } from "../types";

export const userLocationsFetched = (data) => ({
    type: FETCH_USER_LOCATIONS,
    data
});

export const userLocationsByDateFetched = (data) => ({
    type: FETCH_USER_LOCATIONS_BY_DATE,
    data
});

export const fetchUserLocations = (id) => (dispatch) => {
    return api.locations.getUserLocations(id).then((id) => dispatch(userLocationsFetched(id)));
}

export const fetchUserLocationsByDate = (id, date) => (dispatch) => {
    return api.locations.getUserLocationsByDate(id, date).then((id) => dispatch(userLocationsByDateFetched(id)));
}