import axios from '../helpers/axios'
import store from '../store'
import { addressConstants } from './authConstants'


export const getAllUserAddressess = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: addressConstants.GET_ADDRESS_REQUEST,
            })
            const res = await axios.get('/user/address/get')
            if (res.status === 200) {
                dispatch({
                    type: addressConstants.GET_ADDRESS_SUCCESS,
                    payload: res.data.address.address
                })
            } else {
                dispatch({
                    type: addressConstants.GET_ADDRESS_FAILURE,
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const createUserAddressAction = (payload) => {
    return async (dispatch) => {
        const res = await axios.post('/user/address/create', {
            ...payload
        })
        if (res.status === 200) {
            console.log(res.data)
            store.dispatch(getAllUserAddressess())
        }
    }
}

export const updateExistingAddressAction = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: addressConstants.UPDATE_ADDRESS_REQUEST,
        })
        const res = await axios.post(`/user/address/edit`, {
            ...payload
        })
        if (res.status == 200) {
            dispatch({
                type: addressConstants.UPDATE_ADDRESS_SUCCESS
            })
            store.dispatch(getAllUserAddressess())
            console.log(res.data)
        } else {
            dispatch({
                type: addressConstants.GET_ADDRESS_FAILURE,
            })
            console.log(res)
        }
    }
}