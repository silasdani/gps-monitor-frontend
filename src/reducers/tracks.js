import { createSelector } from "reselect";
import { TRACKS_FETCHED, K_CREATED } from "../types";

export default function tracks(state = {}, action = {}) {
  switch (action.type) {
    case TRACKS_FETCHED:
    case K_CREATED:
      return { ...state, ...action.data.entities.tracks };
    default:
      return state;
  }
}

// SELECTORS

export const TracksSelector = state => state.tracks;

export const allTracksSelector = createSelector(TracksSelector, tracksHash =>
  Object.values(tracksHash)
);