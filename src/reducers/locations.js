import { FETCH_USER_LOCATIONS, FETCH_USER_LOCATIONS_BY_DATE } from "../types";

export default function locations(state = {}, action = {}) {
    switch (action.type) {
        case FETCH_USER_LOCATIONS:
        case FETCH_USER_LOCATIONS_BY_DATE:
            return action.data?.length > 0 ? { ...state, ...action.data } : { ...[] };
        default:
            return state;
    }
}

