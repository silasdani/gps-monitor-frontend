import { combineReducers } from "redux";

import user from "./reducers/user";
import tracks from "./reducers/tracks";

export default combineReducers({
  user,
  tracks
});