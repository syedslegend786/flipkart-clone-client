import { cartConstants } from './../actions/authConstants'
const initial_state = {
    cartItems: {

    },
    loggedInUserGetCartLodding: false,
    addedToCartLoading: false,
}
const handleUpdation = (cItems, pload) => {
    const qty = cItems[pload._id] ? parseInt(cItems[pload._id].qty + 1) : 1
    cItems[pload._id] = {
        ...pload,
        qty,
    }
    localStorage.setItem('cartItems', JSON.stringify(cItems))
    return cItems;
}
const handleCartIncrement = (cItems, pload) => {
    if (cItems[pload]) {
        const product = cItems[pload];
        cItems[pload] = {
            ...product,
            qty: parseInt(product.qty + 1),
        }
        localStorage.setItem('cartItems', JSON.stringify(cItems))
        return cItems;
    }
    else {
        console.log('pload is not defined...==>');
    }
}
const handleCartDecrement = (cItems, pload) => {
    if (cItems[pload]) {
        const product = cItems[pload];
        cItems[pload] = {
            ...product,
            qty: parseInt(product.qty - 1),
        }
        localStorage.setItem('cartItems', JSON.stringify(cItems))
        return cItems;
    }
    return cItems;
}
export default (state = initial_state, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART:
            state = {
                ...state,
                cartItems: handleUpdation(state.cartItems, action.payload)
            }
            break;
        case cartConstants.KEEP_CART_ADDED:
            state = {
                ...state,
                cartItems: action.payload,
            }
            break;
        case cartConstants.INCREMENT_CART_ITEM:
            state = {
                ...state,
                cartItems: handleCartIncrement(state.cartItems, action.payload),
            }
            break;
        case cartConstants.DECREMENT_CART_ITEM:
            state = {
                ...state,
                cartItems: handleCartDecrement(state.cartItems, action.payload)
            }
            break;
        case cartConstants.LOGGED_IN_USER_GET_ALL_CART_ITEMS_REQUEST:
            state = {
                ...state,
                loggedInUserGetCartLodding: true,
            }
            break;
        case cartConstants.LOGGED_IN_USER_GET_ALL_CART_ITEMS_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload,
                loggedInUserGetCartLodding: false,
            }
            break;
        case cartConstants.LOGGED_IN_USER_GET_ALL_CART_ITEMS_FAILURE:
            state = {
                ...state,
                loggedInUserGetCartLodding: false,
            }
            break;
        case cartConstants.LOGGED_IN_USER_ADD_TO_CART_REQUEST:
            state = {
                ...state,
                addedToCartLoading: true,
            }
            break;
        case cartConstants.LOGGED_IN_USER_ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                addedToCartLoading: false
            }
            break;
        case cartConstants.LOGGED_IN_USER_ADD_TO_CART_FAILURE:
            state = {
                ...state,
                addedToCartLoading: false,
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initial_state,
            }
            break;
    }
    return state;
}