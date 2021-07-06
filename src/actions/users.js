import api from "../api";
import { userLoggedIn } from "./auth";

export const signup = (data) => (dispatch) =>
  api.user.signup(data).then((user) => {
    localStorage.token = user.remember_digest;
    dispatch(userLoggedIn(user));
  });

export const addUser = (data) => (dispatch) => 
  api.user.addUser(data).then();

export const removeUser = (data) => (dispatch) =>
  api.user.removeUser(data).then();

export const editUser = (data) => (dispatch) => 
  api.user.editUser(data).then();
