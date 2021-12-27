import ApiService from "../api/ApiService";

class UserService extends ApiService {
    constructor() {
        super();
        this.url = '/users';
    }

    signup(user) {
        return super.post(this.url, { user }, ((res) => (res)))
    }

    fetchAll() {
        return super.get(this.url, ((res) => (res.data.data)))
    }

    confirm(token) {
        return super.get("/account_activations/" + token, ((res) => res.data.data.attributes))
    }

    resetPasswordRequest(email) {
        return super.post("/password_resets", { email }, ((res) => res))
    }

    validateToken(token) {
        return super.post("/validate_token", { token }, ((res) => res))
    }

    resetPassword(data) {
        return super.post("/password_resets", { data }, ((res) => res))
    }
}

export default UserService;