import { combineReducers } from "redux";

import user from "./reducers/user";
import users from "./reducers/users";
import tracks from "./reducers/tracks";
import locations from "./reducers/locations";

export default combineReducers({
  user,
  tracks,
  users,
  locations
});