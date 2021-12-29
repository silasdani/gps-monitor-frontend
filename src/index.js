import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode"
import App from "./App";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import configureStore from "./redux/store";
import { userLoggedIn } from "./redux/ducks/sessionDuck"

const store = configureStore();

// if (localStorage.token) {
//   const payload = jwtDecode(localStorage.token);
//   console.warn(payload)
//   const { attributes: { admin, manager, activated, ...user } } = payload.data;

//   setAuthorizationHeader(localStorage.token);
//   store.dispatch(userLoggedIn(user));
// }

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
