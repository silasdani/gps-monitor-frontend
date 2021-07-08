import api from "../api";
import { userLoggedIn } from "./auth";
import { USERS_FETCHED, USER_ADDED, USER_DELETED, USER_EDITED } from "../types";

const usersFetched = (data) => ({
  type: USERS_FETCHED,
  data,
});

const userFetched = (data) => ({
  type: USER_ADDED,
  data,
});

const userDeleted = (data) => ({
  type: USER_DELETED,
  data,
});

const userEdited = (data) => ({
  type: USER_EDITED,
  data,
});

export const signup = (data) => (dispatch) =>
  api.user.signup(data).then((user) => {
    localStorage.token = user.remember_digest;
    dispatch(userLoggedIn(user));
  });

export const addUser = (data) => (dispatch) =>
  api.user.addUser(data).then(dispatch(userFetched(data)));

export const deleteUser = (data) => (dispatch) =>
  api.user.removeUser(data).then(dispatch(userDeleted(data)));

export const editUser = (data) => (dispatch) =>
  api.user.editUser(data).then(dispatch(userEdited(data)));

export const fetchUsers = () => (dispatch) =>
  api.users.fetchAll().then((data) => dispatch(usersFetched(data)));
