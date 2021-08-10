import { orderConstants } from "../actions/authConstants"

const initial_state = {
    loading: false,
    orders: [],
    error: '',
    orderDetailPageData: {},
    orderDetailPageDataLoading: false,
    orderDetailPageDataError: '',
}


export default (state = initial_state, action) => {
    switch (action.type) {
        case orderConstants.GET_ORDER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case orderConstants.GET_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false,
                orders: action.payload,
            }
            break;
        case orderConstants.GET_ORDER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            }
            break;
        case orderConstants.GET_ORDER_DETAIL_PAGE_REQUEST:
            state = {
                ...state,
                orderDetailPageDataLoading: true,
            }
            break;
        case orderConstants.GET_ORDER_DETAIL_PAGE_SUCCESS:
            state = {
                ...state,
                orderDetailPageDataLoading: false,
                orderDetailPageData: action.payload,
            }
            break;
        case orderConstants.GET_ORDER_DETAIL_PAGE_FAILURE:
            state = {
                ...state,
                orderDetailPageDataLoading: false,
                orderDetailPageDataError: action.payload,
            }
            break;
    }
    return state
}