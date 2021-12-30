import UserService from "../../services/UserService";

export const USER_CREATED = "USER_CREATED";
export const RESET_USER_PASSWORD = "RESET_USER_PASSWORD";
export const REQUEST_RESET_PASSWORD = "REQUEST_RESET_PASSWORD";
export const USER_EDITED = "USER_EDITED";
export const USER_DELETED = "USER_DELETED";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const USER_CONFIRMED = "USER_CONFIRMED";
export const TOKEN_VALIDATED = "TOKEN_VALIDATED";

const userCreated = () => ({
    type: USER_CREATED,
});

const userEdited = () => ({
    type: USER_EDITED,
});

const userDeleted = () => ({
    type: USER_DELETED,
});

const tokenValidated = () => ({
    type: TOKEN_VALIDATED,
})

const userConfirmed = () => ({
    type: USER_CONFIRMED,
});

const passwordReseted = () => ({
    type: RESET_USER_PASSWORD,
});

const resetPasswordReseted = () => ({
    type: RESET_USER_PASSWORD,
});

const allUsersFetched = (data) => ({
    type: FETCH_ALL_USERS,
    data
})

export const confirm = () => (dispatch) => {
    return new UserService().confirm()
        .then(dispatch(userConfirmed()))
        .catch(console.warn)
    // TODO: create SUCCESS and ERROR actions e.g: CONIRM_SUCCESS, amd store it in user, confirmed att 
}

export const validateToken = (token) => (dispatch) => {
    return new UserService().validateToken(token)
        .then(dispatch(tokenValidated()))
        .catch(console.warn);
}

export const fetchAll = () => (dispatch) => {
    return new UserService().fetchAll()
        .then((data) => dispatch(allUsersFetched(data)))
        .catch(console.warn);
}

export const resetPasswordRequest = ({ email }) => (dispatch) => {
    return new UserService().resetPasswordRequest(email)
        .then(dispatch(resetPasswordReseted()))
        .catch(console.warn)
}

export const resetPassword = (credentials) => (dispatch) => {
    return new UserService().resetPassword(credentials)
        .then(dispatch(passwordReseted()))
        .catch(console.warn)
}

export const signup = (data) => (dispatch) => {
    return new UserService().signup(data)
        .then(dispatch(userCreated()))
        .catch(console.warn)
}

export const editUser = (data) => (dispatch) => {
    return new UserService().editUser(data)
        .then(dispatch(userEdited()))
        .catch(console.warn);
}

export const deleteUser = (id) => (dispatch) => {
    return new UserService().deleteUser(id)
        .then(dispatch(userDeleted))
        .catch(console.warn);
}

const user = (state = {}, action = {}) => {
    switch (action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                users: action.data,
            }
        default:
            return state;
    }
}

export default user;