import axios from '../helpers/axios'
import store from '../store'
import { authConstants } from './authConstants'
export const singinAction = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.SIGN_IN_REQUEST,
        })
        const res = await axios.post('/user/signin', {
            ...payload
        })
        if (res.status == 200) {
            const { token, user } = res.data;
            localStorage.setItem('FrontEndToken', token)
            localStorage.setItem('FrontEndUser', JSON.stringify(user))
            dispatch({
                type: authConstants.SIGN_IN_SUCCESS,
                payload: {
                    token,
                    user,
                }
            })
        } else {
            dispatch({
                type: authConstants.SIGN_IN_FAILURE,
                payload: {
                    error: res.data.error,
                }
            })
        }
    }
}

export const keepUserLogin = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('FrontEndToken');
        if (token) {
            const user = JSON.parse(localStorage.getItem('FrontEndUser'));
            dispatch({
                type: authConstants.SIGN_IN_SUCCESS,
                payload: {
                    token,
                    user,
                }
            })
        } else {
            dispatch({
                type: authConstants.SIGN_IN_FAILURE,
                payload: { error: 'user not logged in', }
            })
        }
    }

}
export const signOutUserAction = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.SIGN_OUT_REQUEST,
        })
        const res = await axios.post(`/user/signout`);
        if (res.status === 200) {
            localStorage.removeItem('FrontEndToken')
            localStorage.removeItem('FrontEndUser')
            dispatch({
                type: authConstants.SIGN_OUT_SUCCESS
            })
        } else {
            dispatch({
                type: authConstants.SIGN_OUT_FAILURE,
                payload: res.data.error,
            })
        }
    }
}


export const signUpAction = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.SIGN_UP_REQUEST,
        })
        const res = await axios.post(`/user/signup`, {
            ...payload,
        })
        if (res.status === 200) {
            dispatch({
                type: authConstants.SIGN_UP_SUCCESS,
            })
            store.dispatch(singinAction({
                email: payload.email,
                password: payload.password,
            }))
            return true
        } else {
            return false;
        }
    }
}