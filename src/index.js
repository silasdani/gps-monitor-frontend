import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import { autoLogin } from "./redux/ducks/sessionDuck"

if (localStorage.token) {
  store.dispatch(autoLogin(localStorage.token));
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
