import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("http://localhost:3000/login", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("http://localhost:3000/users", { user }).then(res => res.data.user),
    // confirm: token =>
    //   axios
    //     .post("/api/auth/confirmation", { token })
    //     .then(res => res.data.user),
    // resetPasswordRequest: email =>
    //   axios.post("/api/auth/reset_password_request", { email }),
    // validateToken: token => axios.post("/api/auth/validate_token", { token }),
    // resetPassword: data => axios.post("/api/auth/reset_password", { data 
  },
//   tracks: {
//     fetchAll: () => axios.get("/api/tracks").then(res => res.data.tracks),
//     create: track =>
//       axios.post("/api/tracks", { track }).then(res => res.data.track)
//   }
};