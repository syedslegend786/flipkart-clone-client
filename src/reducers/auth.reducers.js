import { authConstants } from "../actions/authConstants"

const initial_state = {
    token: null,
    user: null,
    loading: false,
    authenticate: false,
    errorSignIn: null,
}


export default (state = initial_state, action) => {
    switch (action.type) {
        case authConstants.SIGN_IN_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case authConstants.SIGN_IN_SUCCESS:
            state = {
                ...state,
                loading: false,
                token: action.payload.token,
                user: action.payload.user,
                authenticate: true,
            }
            break;
        case authConstants.SIGN_IN_FAILURE:
            state = {
                ...initial_state,
                loading: false,
                errorSignIn: action.payload.error,
            }
            break;
        case authConstants.SIGN_OUT_SUCCESS:
            state = {
                ...initial_state,
            }
            break;

    }
    return state;
}