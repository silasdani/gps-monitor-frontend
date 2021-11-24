import api from "../api";
import { FETCH_USER_LOCATIONS } from "../types";

export const userLocationsFetched = (data) => ({
    type: FETCH_USER_LOCATIONS,
    data
});

export const fetchUserLocations = (id) => (dispatch) =>{
    return api.locations.getUserLocations(id).then((id) => dispatch(userLocationsFetched(id)));}