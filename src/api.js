import axios from "axios";

const Api = () =>( {
  user: {
    login: credentials =>
      axios.post("/login", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/reset_password_request", { email }),
    validateToken: token => axios.post("/validate_token", { token }),
    resetPassword: data => axios.post("/reset_password", { data 
  })
},
  tracks: {
    fetchAll: () => axios.get("/tracks").then(res => res.data.tracks),
    create: track =>
      axios.post("/tracks", { track }).then(res => res.data.track)
  }
}
)

export default Api;