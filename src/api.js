import axios from "axios";
// eslint-disable-next-line
export default {
  user: {
    // DONE
    login: (credentials) =>
      axios
        .post("/login", {
          email: credentials.email,
          password: credentials.password,
        })
        .then((res) => res.data.data.attributes),

    // DONE
    logout: () => axios.delete("/logout"),

    signup: (user) =>
      axios.post("/users", { user }).then((res) => {
        return res.data.data.attributes;
      }),

    // TODO
    confirm: (token) =>
      axios
        .get("/account_activations/" + token)
        .then((res) => res.data.data.attributes),
    // TODO
    resetPasswordRequest: (email) => axios.post("/password_resets", { email }),

    validateToken: (token) => axios.post("/validate_token", { token }),

    resetPassword: (data) =>
      axios.post("/password_resets", { data }).then((res) => console.warn(res)),
  },
  users: {
    fetchAll: () => axios.get("users").then((res) => res.data.data),
    getData: (id) =>
      axios.get("/users/" + id).then((res) => res.data.data.attributes),
    removeUser: (id) => axios.delete("/users/" + id).then(() => "success"),

    editUser: (user, id) =>
      axios.patch("/users/" + id, { user }).then((res) => res.data),
  },
  tracks: {
    fetchAll: () => axios.get("/tracks/1").then((res) => res.data.data),
    create: (track) => axios.post("/tracks", { track }).then((res) => res.data),
    update: (track, id) =>
      axios.patch("/tracks/" + id, { track }).then((res) => res.data),
  },

  track: {
    getData: (id) =>
      axios
        .get("/tracks/getData/" + id)
        .then((res) => res.data.data.attributes),
    delete: (id) => axios.delete("/tracks/" + id).then(() => "Sucess`"),
  },
};
