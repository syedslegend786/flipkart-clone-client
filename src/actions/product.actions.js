import axios from './../helpers/axios'
import { authConstants, productConstants } from './authConstants'

export const GetProductsBySlug = (slug) => {
    return async (dispatch) => {
        dispatch({
            type: productConstants.PRODUCTS_BY_SLUG_REQUEST,
        })
        const res = await axios.get(`/products/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productConstants.PRODUCTS_BY_SLUG_SUCCESS,
                payload: res.data,
            })
        }
        if (res.status === 400) {
            dispatch({
                type: productConstants.PRODUCTS_BY_SLUG_FAILURE,
                payload: res.data.error,
            })
        }
    }
}


export const getProductByPageRealAction = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: productConstants.PRODUCT_BY_SLUG_PAGE_REAL_REQUEST,
        })
        const res = await axios.get(`page/${payload.cid}/${payload.type}`)
        if (res.status == 200) {
            console.log(res.data.page)
            dispatch({
                type: productConstants.PRODUCT_BY_SLUG_PAGE_REAL_SUCCESS,
                payload: res.data.page,
            })
        } else {
            dispatch({
                type: productConstants.PRODUCT_BY_SLUG_PAGE_REAL_FAILURE,
                payload: res.data.error,
            })
        }
    }
}

export const getProductDetailByProductIdAction = (productId) => {
    return async (dispatch) => {
        dispatch({
            type: productConstants.PRODUCT_DETAIL_REQUEST,
        })
        const res = await axios.get(`/${productId}/getProductDetail`);
        if (res.status == 200) {
            dispatch({
                type: productConstants.PRODUCT_DETAIL_SUCCESS,
                payload: res.data,
            })
        } else {
            dispatch({
                type: productConstants.PRODUCT_DETAIL_FAILURE,
            })
        }
    }
}


export const addReviewAction = (paylaod) => {
    return async (dispatch) => {
        const res = await axios.post('/product/add/review', { ...paylaod })
        if (res.status === 200) {
            return true
        } else {
            return false
        }
    }
}