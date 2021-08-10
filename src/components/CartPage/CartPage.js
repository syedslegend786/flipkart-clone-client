import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../Layout/Layout'
import './style.css';
import CartItemsList from './CartiItemList/CartItemsList';
import { loggedInUserGetCatItems } from '../../actions/cart.actions';
import { useNavigate } from 'react-router-dom'
const CartPage = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()
    useEffect(() => {
        if (auth.authenticate) {
            dispatch(loggedInUserGetCatItems())
        }
    }, [auth.authenticate])
    useEffect(() => {
        if (cart.addedToCartLoading) {
            dispatch(loggedInUserGetCatItems())
        }
    }, [cart.addedToCartLoading, cart.cartItems])
    if (cart.loggedInUserGetCartLodding) {
        return <div>Loading</div>
    }
    return (
        <Layout>
            {
                cart.cartItems && Object.keys(cart?.cartItems).length ?
                    <div className='cart'>
                        <div className='cart__items'>
                            <div className='cart__header'>
                                <h3>My Cart ({Object.keys(cart?.cartItems).length}s)</h3>
                                <h4>Diliver to</h4>
                            </div>
                            <div className='cart__items__render'>
                                {
                                    Object.keys(cart.cartItems).map((val, index) => (
                                        <CartItemsList key={index} val={val} />
                                    ))
                                }
                            </div>
                        </div>
                    </div> :
                    <div>Go add Some Items to Cart</div>
            }
            {
                cart.cartItems && Object.keys(cart?.cartItems).length > 0 ?
                    < div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        margin: '30px',
                        position: 'relative',
                    }}>
                        <button
                            onClick={() => navigate('/checkout')}
                            style={{
                                backgroundColor: '#FF9F00',
                                color: 'white',
                                padding: '10px',
                                width: '200px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        > CheckOut</button>
                    </div>
                    :
                    ''
            }

        </Layout >
    )
}

export default CartPage
