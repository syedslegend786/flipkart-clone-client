import axios from '../helpers/axios'
import { cartConstants, orderConstants } from './authConstants'


export const createdOrder = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/user/order/create', {
                ...payload
            })
            if (res.status === 200) {
                console.log(res.data)
                dispatch({
                    type: cartConstants.RESET_CART,
                })
                return true;
            } else {
                console.log('error while ordering')
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const getOrdersActions = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: orderConstants.GET_ORDER_REQUEST
            })
            const res = await axios.get(`/user/order/get`)
            if (res.status === 200) {
                dispatch({
                    type: orderConstants.GET_ORDER_SUCCESS,
                    payload: res.data.order,
                })
            } else {
                dispatch({
                    type: orderConstants.GET_ORDER_FAILURE,
                    payload: res.data.error
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getOrderDetailPageAction = (orderId, addressId) => {
    return async (dispatch) => {
        dispatch({
            type: orderConstants.GET_ORDER_DETAIL_PAGE_REQUEST,
        })
        const res = await axios.get(`/order/detailpage/${orderId}/${addressId}`)
        if (res.status === 200) {
            dispatch({
                type: orderConstants.GET_ORDER_DETAIL_PAGE_SUCCESS,
                payload: res.data.address,
            })
        } else {
            dispatch({
                type: orderConstants.GET_ORDER_DETAIL_PAGE_FAILURE,
                payload: res.data.error,
            })
        }
    }
}