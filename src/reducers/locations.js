import { FETCH_USER_LOCATIONS } from "../types";

export default function locations(state = {}, action = {}) {
    switch (action.type) {
        case FETCH_USER_LOCATIONS:
            return { ...state, ...action.data };
        default:
            return state;
    }
}

