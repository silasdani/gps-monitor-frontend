import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";

import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const login = (credentials) => (dispatch) =>
  api.user.login(credentials).then((user) => {
    console.log(credentials);
    console.log(user);
    localStorage.token = user.remember_digest;
    setAuthorizationHeader(user.remember_digest);
    dispatch(userLoggedIn(user));
  });

export const logout = () => (dispatch) =>
  api.user.logout().then(() => {
    localStorage.removeItem("token");
    setAuthorizationHeader();
    dispatch(userLoggedOut());
  });

export const confirm = (token) => (dispatch) =>
  api.user.confirm(token).then((user) => {
    localStorage.token = user.remember_digest;
    dispatch(userLoggedIn(user));
  });

export const resetPasswordRequest =
  ({ email }) =>
  () =>
    api.user.resetPasswordRequest(email);

export const validateToken = (token) => () => api.user.validateToken(token);

export const resetPassword = (data) => () => api.user.resetPassword(data);
