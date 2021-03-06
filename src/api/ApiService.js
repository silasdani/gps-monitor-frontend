import axios from "axios";
// import { hideSpinner, showSpinner } from "../redux/ducks/spinnerDuck";
// import store from "../redux/store";

class ApiService {
  get(url, mapFunc = () => { }) {
    let headers = config();
    // store.dispatch(showSpinner());

    return axios.get(url, headers).then((response) => {
      // store.dispatch(hideSpinner());
      return mapFunc(response);
    });
  }

  post(url, body, mapFunc, params = {}) {
    // store.dispatch(showSpinner());

    return axios
      .post(url, body, params)
      .then((response) => {
        // store.dispatch(hideSpinner());
        return mapFunc(response);
      });
  }

  patch(url, body, mapFunc, params = {}) {
    // store.dispatch(showSpinner());

    return axios
      .patch(url, body, params)
      .then((response) => {
        // store.dispatch(hideSpinner());
        return mapFunc(response);
      });
  }

  delete(url, params = {}) {
    // store.dispatch(showSpinner());

    let headers = { ...params, ...config() };
    if (params.headers) {
      headers.headers = {
        ...headers.headers,
        ...params.headers,
      };
    }
    return axios.delete(url, headers)
      .then(() => {
        // store.dispatch(hideSpinner());
      });
  }
}

export default ApiService;

const config = () => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};
