import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrementCartItems, incrementCartItemAction, loggedInUserDecrement, loggedInUserIncrement, removeProductFromCartAction } from '../../../actions/cart.actions';
import { publicUrl } from '../../../helpers/getPublicUrl';

const CartItemsList = (props) => {
    console.log(props)
    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { val } = props;
    const handleItemIncrement = (productId) => {
        console.log('productId===>', productId);
        if (auth.authenticate) {
            dispatch(loggedInUserIncrement(productId))
        } else {
            dispatch(incrementCartItemAction(productId));
        }
    }
    const handleItemDecrement = (productId) => {
        if (auth.authenticate && cart?.cartItems[productId].qty > 1) {
            dispatch(loggedInUserDecrement(productId))
        } else {
            if (cart?.cartItems[productId].qty > 1) {
                dispatch(decrementCartItems(productId))
            } else {
            }
        }
    }
    const handleRemoveItemFromCart = (_id) => {
        const payload = {
            productId: _id,
        }
        dispatch(removeProductFromCartAction(payload));
    }
    return (
        <div className='real__item__cont'>
            <div className='item__img'>
                <img className='cart__item__img__show' src={publicUrl(cart?.cartItems[val].productPictures)} alt='' />
            </div>
            <div className='item__data'>
                <h2 className='item__title'>{cart?.cartItems[val].name}</h2>
                <h2 className='item__data__opacity'>Seller: Assured 100%</h2>
                <h2 className='item__price'><span>RS: </span>{cart?.cartItems[val].price}</h2>
            </div>
            <div className='item__diliveryDetail'>
                <h2 className='item__title'>Dilivery by Satureday is confirmed</h2>
                <div>
                    <button className='save__later'>Save For Later</button>
                    <button onClick={() => handleRemoveItemFromCart(val)} className='remove__item'>Remove</button>
                </div>
                <div style={{
                    marginTop: '10px',
                    textAlign: 'center',
                }}
                    className='qty__handler'
                >
                    <span>quanty:  </span>
                    <button onClick={() => handleItemDecrement(val)}>-</button>
                    <span className='product__qty'>{cart?.cartItems[val].qty}</span>
                    <button onClick={() => handleItemIncrement(val)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default CartItemsList
