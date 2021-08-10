import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserAddressess } from '../../actions/address.actions'
import Layout from '../Layout/Layout'
import Section from './helpers/Section'
import '../Header/style.css'
import './style.css'
import { MaterialInput, Modal, MaterialButton, } from './../MeterialUi/MeterialUiComponents'
import { singinAction } from '../../actions/auth.actions'
import AddNewAddress from './helpers/AddNewAddress'
import { loggedInUserGetCatItems } from '../../actions/cart.actions'
import CartItemsList from '../CartPage/CartiItemList/CartItemsList'
import { useNavigate } from 'react-router-dom'
import { createdOrder } from '../../actions/order.actions'
const CheckOutPage = () => {
    const navigate = useNavigate()
    const [orderType, setOrderType] = useState('')
    const [idOfUpdatingAddress, setidOfUpdatingAddress] = useState('')
    const [updatingControl, setUpdatingControl] = useState(false)
    const cart = useSelector(state => state.cart)
    const [totalPrice, setToralPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [diliveryCharges, setDiliveryCharges] = useState(0)
    const [loginModal, setLoginModal] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [radio, setRadio] = useState('')
    const [handleAddNewUser, setHandleAddNewUser] = useState(false)
    const address = useSelector(state => state.address)
    const auth = useSelector(state => state.auth)
    console.log(radio)
    if (!Object.values(cart.cartItems).length) {
        navigate('/cart')
    }
    const handleLoginActionDone = () => {
        const payload = {
            email,
            password,
        }
        dispatch(singinAction(payload))
        setLoginModal(false)
    }
    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getAllUserAddressess())
        }
    }, [auth.authenticate])
    useEffect(() => {
        dispatch(loggedInUserGetCatItems())
    }, [])
    const handleTotalPrice = (obj) => {
        console.log(obj)
        let sum = 0;
        const items = Object.values(obj).map((val) => (
            val.price * val.qty
        ))
        const total = items.reduce((val, i) => (val += i), 0)
        return total;
    }
    const handleDiscount = () => {
        return 'null'
    }
    const handleFinalTotal = () => {
        const _f = handleTotalPrice(cart.cartItems)
        return _f;
    }
    const handleTotalItems = () => {
        const arr = Object.values(cart?.cartItems).map((val) => (
            val.qty
        ))
        const total = arr.reduce((v, i) => (v += i), 0)
        return total;
    }
    const handleProduct = () => {
        const arr = Object.keys(cart.cartItems).map((val) => {
            return {
                productId: val,
                payablePrice: (parseInt(cart.cartItems[val].price) * parseInt(cart.cartItems[val].qty)).toString(),
                quantity: cart.cartItems[val].qty,
            }
        })
        return arr;
    }
    const handleConfirmOrder = () => {
        if (!radio) {
            alert('kindly select your location');
        } else if (!orderType) {
            alert('Select Your Order type', 'cash on dilivery etc...')
        }

        else {
            const payload = {
                "user": auth.user._id,
                "addressId": radio,
                "products": handleProduct(),
                "totalPrice": handleProduct().map(val => parseInt(val.payablePrice)).reduce((val, i) => (val += i), 0),
                "paymentStatus": "pending",
                paymentType: orderType,
                orderStatus: [
                    {
                        type: 'ordered',
                        date: new Date,
                        isCompleted: true
                    },
                    {
                        type: 'packed',
                        isCompleted: false
                    },
                    {
                        type: 'shiped',
                        isCompleted: false
                    },
                    {
                        type: 'dilivered',
                        isCompleted: false
                    },
                ]
            }
            dispatch(createdOrder(payload))
                .then((val) => {
                    if (val) {
                        navigate('/orderplaced')
                    }
                })
        }
    }
    const myLoginModal = () => {
        return (
            <Modal
                visible={loginModal}
                onClose={() => setLoginModal(false)}
            >
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="rightspace">
                            <MaterialInput
                                type="text"
                                label="Enter Email/Enter Mobile Number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <MaterialInput
                                type="password"
                                label="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                rightElement={<a href="#">Forgot?</a>}
                            />

                            <MaterialButton
                                title="Login"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                onClick={handleLoginActionDone}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
    const arrayForOrderType = [
        { type: 'cod' },
    ]
    return (
        <Layout>
            <div className='checkout'>
                <div className='checkout__sections'>
                    <div className='checkout__sections__steps'>
                        {<>

                            <Section
                                sectionNumber='1'
                                sectionName='Login'
                            >
                                {
                                    auth.authenticate ?
                                        <h6>{auth.user.fullName}</h6> :
                                        <button onClick={() => setLoginModal(true)}>Login</button>
                                }
                            </Section>
                            {
                                updatingControl ? <AddNewAddress updating setUpdatingControl={setUpdatingControl} idOfUpdatingAddress={idOfUpdatingAddress} />
                                    :
                                    <Section
                                        sectionNumber='2'
                                        sectionName='Select Address'
                                    >
                                        {auth.authenticate ?
                                            address.loading ? <div>Loading </div>
                                                :
                                                address.address.map((val, index) => (
                                                    < div className='checkout__cont__addresses'>
                                                        <div className='checkout__radio'>
                                                            <input type='radio' value={val._id} checked={radio === val._id} onChange={e => setRadio(e.target.value)} />
                                                        </div>
                                                        <div className='checkout__address'>
                                                            <div className='imogi'>
                                                                <span className='checkout__address__detail'>{val.name}</span>
                                                            </div>
                                                            <div className='imogi'>
                                                                <span className='checkout__address__detail'>{val.province}</span>
                                                            </div>
                                                            <div className='imogi'>
                                                                <span className='checkout__address__detail'>{val.city}</span>
                                                            </div>
                                                            <div className='imogi'>

                                                                <span className='checkout__address__detail'>{val.emailAddress}</span>
                                                            </div>
                                                            <div className='imogi'>
                                                                <span className='checkout__address__detail'>{val.mobileNumber}</span>
                                                            </div>
                                                        </div>
                                                        <div className='checkout__edit'>
                                                            <button onClick={() => {
                                                                setidOfUpdatingAddress(val._id)
                                                                setUpdatingControl(!updatingControl)
                                                            }}>Edit</button>
                                                            <button>Remove</button>
                                                        </div>
                                                    </div>
                                                ))
                                            :
                                            ''
                                        }
                                    </Section>
                            }
                            {auth.authenticate && <Section
                                sectionNumber='+'
                                sectionName='Add New Address'
                                setHandleAddNewUser={setHandleAddNewUser}
                                handleAddNewUser={handleAddNewUser}
                            >
                                {
                                    handleAddNewUser ?
                                        <AddNewAddress adding />
                                        :
                                        ''
                                }
                            </Section>}
                            <Section
                                sectionName='Order Summary'
                            >
                                {cart.cartItems &&
                                    Object.keys(cart.cartItems).map((val, index) => (
                                        <CartItemsList key={index} val={val} />
                                    ))
                                }
                            </Section>
                            {
                                auth.authenticate &&
                                <Section
                                    sectionName='Payment Method'
                                >
                                    <div style={{

                                    }}>
                                        {
                                            arrayForOrderType.map((val, index) => (
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    backgroundColor: '#ECECEC',
                                                    padding: '0 10px',
                                                    fontSize: '14px',
                                                }}>
                                                    <input type='radio' value={val.type} checked={val.type === orderType} onChange={(e) => setOrderType(e.target.value)} />
                                                    <p>Cash On dilivery</p>
                                                </div>
                                            ))
                                        }

                                    </div>
                                    <div>
                                        <button onClick={handleConfirmOrder}>Confirm Order</button>
                                    </div>
                                </Section>
                            }
                        </>
                        }
                    </div>
                    <div className='checkout__sections__price'>
                        <Section
                            sectionNumber=''
                            sectionName='Price'
                        >
                            <div className='price__div'>
                                <span>price ( {handleTotalItems()} items )</span>
                                <span>{handleTotalPrice(cart.cartItems)}</span>
                            </div>
                            <div className='price__div'>
                                <span>discount</span>
                                <span>{handleDiscount()}</span>
                            </div>
                            <div className='price__div'>
                                <span>dilivery charges</span>
                                <span>free</span>
                            </div>
                            <div className='price__div'>
                                <span>total :</span>
                                <span>{handleFinalTotal()}</span>
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
            {
                myLoginModal()
            }
        </Layout >
    )
}

export default CheckOutPage
