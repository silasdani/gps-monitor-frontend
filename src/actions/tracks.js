import {
  TRACKS_FETCHED,
  TRACK_CREATED,
  TRACK_EDITED,
  TRACK_DELETED,
} from "../types";
import api from "../api";

const tracksFetched = (data) => ({
  type: TRACKS_FETCHED,
  data,
});

const trackCreated = (data) => ({
  type: TRACK_CREATED,
  data,
});

const trackEdited = (data) => ({
  type: TRACK_EDITED,
  data,
});

const trackDeleted = (data) => ({
  type: TRACK_DELETED,
  data,
});

export const fetchTracks = () => (dispatch) =>
  api.tracks.fetchAll().then((tracks) => dispatch(tracksFetched(tracks)));

export const createTrack = (data) => (dispatch) =>
  api.tracks.create(data).then((track) => dispatch(trackCreated(track)));

export const editTrack = (data, id) => (dispatch) =>
  api.tracks.update(data, id).then((track) => dispatch(trackEdited(track)));

export const deleteTrack = (id) => (dispatch) =>
  api.track.delete(id).then(() => dispatch(trackDeleted(id)));
