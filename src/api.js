import axios from "axios";
// eslint-disable-next-line
export default {
  
  // Account actions
user: {
  login: (credentials) =>
    axios
      .post("/login", { email: credentials.email, password: credentials.password })
      .then((res) => res.data.data.attributes),

  logout: () => 
    axios
      .delete("/logout"),

  signup: (user) =>
    axios
      .post("/users", { user })
      .then((res) => res.data.data.attributes),

  confirm: (token) =>
    axios
      .get("/account_activations/" + token)
      .then((res) => res.data.data.attributes),

  resetPasswordRequest: (email) => 
    axios
      .post("/password_resets", { email })
      .then((res) => res),

  validateToken: (token) => 
    axios
      .post("/validate_token", { token }),

  resetPassword: (data) =>
    axios
      .post("/password_resets", { data })
      .then((res) => console.warn(res)),
},

// Users CRUD
users: {
  fetchAll: () => 
    axios
      .get("/users")
      .then((res) => res.data),

  getData: (id) =>
    axios
      .get("/users/" + id)
      .then((res) => res.data.data.attributes),

  removeUser: (id) => 
    axios
      .delete("/users/" + id)
      .then(() => "success"),

  editUser: (user, id) =>
    axios
      .patch("/users/" + id, { user })
      .then((res) => res.data),
},

  // Tracks CRUD
tracks: {
  fetchMyTracks: () => 
    axios
      .get("/tracks/my")
      .then((res) => res.data.data),
  
  create: (track) =>
    axios
      .post("/tracks", { track })
      .then((res) => res.data),
  
  update: (track, id) =>
    axios
      .patch("/tracks/" + id, { track })
      .then((res) => res.data),
  
  fetchAll: () => 
    axios
      .get("/tracks")
      .then((res) => res.data.data),

  weekly_report: () =>
    axios
      .get("/tracks/weekly_report")
      .then((res) => res.data),

  getData: (id) =>
    axios
      .get("/tracks/" + id)
      .then((res) => res.data.data.attributes),

  delete: (id) => 
    axios
      .delete("/tracks/" + id)
      .then(() => "Success"),
  }
}
