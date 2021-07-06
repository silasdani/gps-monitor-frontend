// import { createSelector } from "reselect";
import { TRACKS_FETCHED, TRACK_CREATED } from "../types";

export default function tracks(state = {}, action = {}) {
  switch (action.type) {
    case TRACKS_FETCHED:
      return { ...state, ...action.data };
    case TRACK_CREATED:
      return {state, action}
    default:
      return state;
  }
}

