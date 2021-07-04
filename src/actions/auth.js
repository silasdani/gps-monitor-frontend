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


// DONE
export const login = (credentials) => (dispatch) =>
  api.user.login(credentials).then((user) => {
    localStorage.name = user.name;
    localStorage.confirmed = user.activated;
    localStorage.current_id = user.id;
    localStorage.token = user.remember_digest;
    setAuthorizationHeader(user.remember_digest);
    dispatch(userLoggedIn(user));
  });

// DONE
export const logout = () => (dispatch) =>
  api.user.logout().then(() => {
    localStorage.clear();
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
