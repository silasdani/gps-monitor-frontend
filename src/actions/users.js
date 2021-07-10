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
    dispatch(userLoggedIn(user));
  });

export const addUser = (data) => (dispatch) =>
  api.users.addUser(data).then(dispatch(userFetched(data)));

export const deleteUser = (id) => (dispatch) =>
  api.users.removeUser(id).then((id) => dispatch(userDeleted(id)));

export const editUser = (user, id) => (dispatch) =>
  api.users.editUser(user, id).then((data) => dispatch(userEdited(data)));

export const fetchUsers = () => (dispatch) =>
  api.users.fetchAll().then((data) => dispatch(usersFetched(data)));
