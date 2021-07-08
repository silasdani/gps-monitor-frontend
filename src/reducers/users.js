import {
  USERS_FETCHED,
  USER_DELETED,
  USER_EDITED,
  USER_ADDED
} from "../types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USERS_FETCHED:
    case USER_ADDED:
      return { ...state, ...action.data };
    case USER_EDITED:
    case USER_DELETED:
      return state;
    default:
      return state;
  }
}
