import { combineReducers } from "redux";
import catagoryReducer from './catagory.reducers'
import productReducer from './product.reducers';
import authReducer from './auth.reducers';
import cartReducer from './cart.reducers';
import addressReducer from './address.reducers'
import orderReducer from './order.reducers'
const rootReducer = combineReducers({
    catagory: catagoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
})
export default rootReducer