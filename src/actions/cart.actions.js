import { cartConstants } from "./authConstants"
import store from './../store/index'
import axios from "../helpers/axios"

export const addToCartAction = (data) => {
    const { auth } = store.getState()
    return async (dispatch) => {
        dispatch({
            type: cartConstants.ADD_TO_CART,
            payload: data,
        })
    }
}
export const incrementCartItemAction = (data) => {
    return async (dispatch) => {
        dispatch({
            type: cartConstants.INCREMENT_CART_ITEM,
            payload: data,
        })
    }
}
export const decrementCartItems = (data) => {
    return async (dispatch) => {
        dispatch({
            type: cartConstants.DECREMENT_CART_ITEM,
            payload: data,
        })
    }
}

export const keepCartAdded = () => {
    return async (dispatch) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        console.log('stringify===>', cartItems)
        if (cartItems) {
            dispatch({
                type: cartConstants.KEEP_CART_ADDED,
                payload: cartItems
            })
        } else {
            dispatch({
                type: cartConstants.KEEP_CART_ADDED,
                payload: {},
            })
        }
    }
}

export const loggedInuserAddToCart = (data) => {
    return async (dispatch) => {
        dispatch({
            type: cartConstants.LOGGED_IN_USER_ADD_TO_CART_REQUEST,

        })
        const cartItems = {
            product: data._id,
            qty: 1,
        }
        const res = await axios.post('/user/addToCart', {
            cartItems
        })
        if (res.status == 200) {
            dispatch({
                type: cartConstants.LOGGED_IN_USER_ADD_TO_CART_SUCCESS,
            })
        }
        if (res.status == 400) {
            dispatch({
                type: cartConstants.LOGGED_IN_USER_ADD_TO_CART_FAILURE,
            })
        }

    }
}

export const loggedInUserGetCatItems = () => {
    return async (dispatch) => {
        dispatch({
            type: cartConstants.LOGGED_IN_USER_GET_ALL_CART_ITEMS_REQUEST,
        })
        const res = await axios.get('/user/getUserCart');
        console.log(res.data.cartItems)
        if (res.status == 200) {
            dispatch({
                type: cartConstants.LOGGED_IN_USER_GET_ALL_CART_ITEMS_SUCCESS,
                payload: res.data.cartItems,
            })
        } else {
            dispatch({
                type: cartConstants.LOGGED_IN_USER_GET_ALL_CART_ITEMS_FAILURE,
            })
        }
    }
}


export const loggedInUserIncrement = (slug) => {
    return async (dispatch) => {
        const res = await axios.post(`/user/cart/increment/${slug}`)
        if (res.status == 200) {
            store.dispatch(loggedInUserGetCatItems())
        } else {
            console.log('error')
        }
    }
}
export const loggedInUserDecrement = (slug) => {
    return async (dispatch) => {
        const res = await axios.post(`/user/cart/decrement/${slug}`)
        if (res.status == 200) {
            store.dispatch(loggedInUserGetCatItems())
        } else {
            console.log('error')
        }
    }
}


export const removeProductFromCartAction = (payload) => {
    return async (dispatch) => {
        const res = await axios.post(`/user/cart/deleteproduct`, {
            ...payload,
        })
        if (res.status === 200) {
            dispatch(loggedInUserGetCatItems())
        } else {

        }
    }
}