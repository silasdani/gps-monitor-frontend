  
import { normalize } from "normalizr";
import { TRACKS_FETCHED, TRACK_CREATED } from "../types";
import api from "../api";
import { trackSchema } from "../schemas";

// data.entities.tracks
const tracksFetched = data => ({
  type: TRACKS_FETCHED,
  data
});

const trackCreated = data => ({
  type: TRACKK_CREATED,
  data
});

export const fetchTracks = () => dispatch =>
  api.tracks
    .fetchAll()
    .then(tracks => dispatch(tracksFetched(normalize(tracks, [trackSchema]))));

export const createTrack = data => dispatch =>
  api.tracks
    .create(data)
    .then(track => dispatch(trackCreated(normalize(track, trackSchema))));