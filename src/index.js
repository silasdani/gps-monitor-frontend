import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import decode from "jwt-decode";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import rootReducer from "./rootReducer";
import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.token) {
  // const payload = decode(localStorage.token);
  const user = {
    remember_digest: localStorage.token,
    id: localStorage.id,
    email: localStorage.email,
    activated: localStorage.confirmed === "true" ? true : false,
    admin: localStorage.admin === "true" ? true : false,
    manager: localStorage.manager === "true" ? true : false,
    name: localStorage.name,
  };

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
