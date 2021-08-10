import { addressConstants } from "../actions/authConstants";

const initial__state = {
    loading: false,
    address: [
        {
        }
    ],
    updating: false,
    updated: false,

}


export default (state = initial__state, action) => {
    switch (action.type) {
        case addressConstants.GET_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break
        case addressConstants.GET_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload,
                loading: false,
            }
            break;
        case addressConstants.GET_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
            }
            break;
        case addressConstants.UPDATE_ADDRESS_REQUEST:

    }
    return state;
}