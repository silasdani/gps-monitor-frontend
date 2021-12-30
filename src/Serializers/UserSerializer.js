import jwtDecode from "jwt-decode"

export default class UserSerializer {
    static serialize(user) {
        return {
            user: {
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.passwordConfirm
            }
        }
    }

    static deserialize(answer) {
        if (parseInt(answer.status / 100) !== 2) return {};

        const { token } = answer.data;
        localStorage.token = token;
        const data = token ? JSON.parse(jwtDecode(token)) : answer.data;

        const { attributes: { manager, activated, ...user } } = data.data;
        return {
            ...user
        }
    }

    static deserializeToken(token) {
        const data = JSON.parse(jwtDecode(token));
        const { attributes: { manager, activated, ...user } } = data.data;

        return {
            ...user
        }
    }
}