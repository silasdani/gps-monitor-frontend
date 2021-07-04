import axios from "axios";
// eslint-disable-next-line
export default {
  user: {
    // DONE
    login: (credentials) =>
      axios
        .post("/login", {
          email: credentials.email,
          password: credentials.password
        })
        .then((res) => res.data.data.attributes),

    // DONE
    logout: () => axios.delete("/logout"),

    // DONE
    signup: (user) =>
      axios.post("/users", { user }).then((res) => {
        return res.data;
      }),

    // TODO
    confirm: (token) =>
      axios
        .post("/account_activations", { token })
        .then((res) => res.data.data.attributes),
    // TODO
    resetPasswordRequest: (email) =>
      axios.post("/reset_password_request", { email }),

    validateToken: (token) => axios.post("/validate_token", { token }),
    resetPassword: (data) => axios.post("/reset_password", { data }),
  },
  tracks: {
    fetchAll: () => axios.get("/tracks/" + localStorage.current_id).then((res) => res.data.attributes),
    create: (track) =>
      axios.post("/tracks", { track }).then((res) => res.data.attributes),
  },
};
