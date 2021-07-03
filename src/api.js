import axios from "axios";
// eslint-disable-next-line
export default {
  user: {
    login: (credentials) =>
      axios
        .post("/login", {
          email: credentials.email,
          password: credentials.password,
        })
        .then((res) => res.data.data.attributes),
    logout: () =>
    axios
    .delete('/logout'),
    signup: (user) =>
      axios.post("/users", { user }).then((res) => res.data.data.attributes),
    confirm: (token) =>
      axios
        .post("/account_activations", { token })
        .then((res) => res.data.data.attributes),
    resetPasswordRequest: (email) =>
      axios.post("/reset_password_request", { email }),
    validateToken: (token) => axios.post("/validate_token", { token }),
    resetPassword: (data) => axios.post("/reset_password", { data }),
  },
  tracks: {
    fetchAll: () => axios.get("/tracks").then((res) => res.data.tracks),
    create: (track) =>
      axios.post("/tracks", { track }).then((res) => res.data.track),
  },
};
