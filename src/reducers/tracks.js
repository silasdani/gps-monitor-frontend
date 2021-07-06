// import { createSelector } from "reselect";
import { TRACKS_FETCHED, TRACK_CREATED } from "../types";

export default function tracks(state = {}, action = {}) {
  switch (action.type) {
    case TRACKS_FETCHED:
    case TRACK_CREATED:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

