// import { createSelector } from "reselect";
import {
  TRACKS_FETCHED,
  TRACK_CREATED,
  TRACK_EDITED,
  TRACK_DELETED,
} from "../types";

export default function tracks(state = {}, action = {}) {
  switch (action.type) {
    case TRACKS_FETCHED:
      return { ...state, ...action.data };
    case TRACK_CREATED:
    case TRACK_EDITED:
    case TRACK_DELETED:
      return { ...state };

    default:
      return state;
  }
}
