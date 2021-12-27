import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode"
import App from "./App";
import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import store from "./redux/store";

if (localStorage.token) {
  const payload = jwtDecode(localStorage.token);
  const { attributes: { admin, manager, activated, ...user } } = payload.data;

  setAuthorizationHeader(localStorage.token);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
reportWebVitals();
