import React, { useState } from 'react';
import './style.css';
import flipkartLogo from '../../../src/assets/images/flipkart.png';
import goldenStar from '../../../src/assets/images/star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu
} from '../MeterialUi/MeterialUiComponents';
import { useDispatch, useSelector } from 'react-redux';
//actions...
import { signOutUserAction, signUpAction, singinAction } from './../../actions/auth.actions'
import { Link, useNavigate } from 'react-router-dom';
const Header = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)
    const [loginModal, setLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpModal, setSignUpModal] = useState(false)
    //
    //signUp
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [userName, setUserName] = useState('')
    //signUp
    const handleLoginActionDone = () => {
        console.log(email, password)
        const payload = {
            email,
            password,
        }
        dispatch(singinAction(payload))
        setLoginModal(false)
    }
    auth.authenticate && console.log(auth.user.fullName)
    const handleSignUp = () => {
        if (firstName && lastName && email && password && userName) {
            const payload = {
                firstName,
                lastName,
                userName,
                email,
                password,
            }
            dispatch(signUpAction(payload))
                .then((val) => {
                    if (val) {
                        setSignUpModal(false)
                    }
                })
        } else {
            alert('kindly fill all the inputs...')
        }
    }
    const handleCartLength = () => {
        return Object.keys(cart.cartItems).length;
    }
    const renderDropDownNonLogged = () => {
        return (
            <DropdownMenu
                menu={
                    <a className="loginButton" onClick={() => setLoginModal(true)}>
                        Login
                    </a>
                }
                menus={[
                    { label: 'My Profile', href: '', icon: null },
                    { label: 'Flipkart Plus Zone', href: '', icon: null },
                    { label: 'Orders', href: '', icon: null },
                    { label: 'Wishlist', href: '', icon: null },
                    { label: 'Rewards', href: '', icon: null },
                    { label: 'Gift Cards', href: '', icon: null },
                ]}
                firstMenu={
                    <div className="firstmenu">
                        <span>New Customer?</span>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                setSignUpModal(true)
                            }}
                            style={{ color: '#2874f0', cursor: 'pointer' }}>Sign Up</a>
                    </div>
                }
            />
        );
    }
    const handleSignOut = () => {
        dispatch(signOutUserAction())
    }
    const handleOrder = () => {
        navigate('/orderplaced')
    }
    const renderDropDownLoggedInUser = () => {
        return (
            <DropdownMenu
                menu={
                    <a className="more">
                        {
                            auth.user.fullName
                        }
                    </a>
                }
                menus={[
                    { label: 'My Profile', href: '', icon: null },
                    { label: 'Flipkart Plus Zone', href: '', icon: null },
                    { label: 'Orders', href: '', icon: null, onClick: handleOrder },
                    { label: 'Wishlist', href: '', icon: null },
                    { label: 'Rewards', href: '', icon: null },
                    { label: 'Gift Cards', href: '', icon: null },
                    { label: 'Sign Out', href: '', icon: null, onClick: handleSignOut },
                ]}
                firstMenu={
                    <div className="firstmenu">
                        <span>New Customer?</span>
                        <a style={{ color: '#2874f0', cursor: 'pointer' }}>Sign Up</a>
                    </div>
                }
            />
        );
    }

    const modalSignUp = () => {
        return (
            <Modal
                visible={signUpModal}
                onClose={() => setSignUpModal(false)}
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
                                label="first name"
                                value={firstName}
                                onChange={(e) => setfirstName(e.target.value)}
                            />
                            <MaterialInput
                                type="text"
                                label="last name"
                                value={lastName}
                                onChange={(e) => setlastName(e.target.value)}
                            />
                            <MaterialInput
                                type="text"
                                label="username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <MaterialInput
                                type="text"
                                label="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MaterialInput
                                type="password"
                                label="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <MaterialButton
                                title="Sign Up"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                onClick={handleSignUp}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
    return (
        <div className="header">
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
            <div className="subHeader">
                <div className="logo">
                    <Link to='/'>
                        <img src={flipkartLogo} className="logoimage" alt="" />
                    </Link>
                    <a style={{ marginTop: '-10px' }}>
                        <span className="exploreText">Explore</span>
                        <span className="plusText">Plus</span>
                        <img src={goldenStar} className="goldenStar" alt="" />
                    </a>
                </div>
                <div style={{
                    padding: '0 10px'
                }}>
                    <div className="searchInputContainer">
                        <input
                            className="searchInput"
                            placeholder={'search for products, brands and more'}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch style={{
                                color: '#2874f0'
                            }} />
                        </div>

                    </div>
                </div>
                <div className="rightMenu">
                    {auth.authenticate == true ?
                        renderDropDownLoggedInUser()
                        :
                        renderDropDownNonLogged()
                    }
                    <DropdownMenu
                        menu={
                            <a className="more">
                                <span>More</span>
                                <IoIosArrowDown />
                            </a>
                        }
                        menus={[
                            { label: 'Notification Preference', href: '', icon: null },
                            { label: 'Sell on flipkart', href: '', icon: null },
                            { label: '24x7 Customer Care', href: '', icon: null },
                            { label: 'Advertise', href: '', icon: null },
                            { label: 'Download App', href: '', icon: null }
                        ]}
                    />
                    <div style={{
                        position: 'relative'
                    }}>
                        <span style={{
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            objectFit: 'contain',
                            padding: '5px',
                            position: 'absolute',
                            fontSize: '10px',
                            color: 'white',
                            top: '-0.5rem',
                            left: '0.4rem',
                            fontWeight: 'bold'
                        }}>{handleCartLength()}</span>
                        <a style={{
                        }} className="cart" onClick={(e) => {
                            e.preventDefault()
                            navigate('/cart');
                        }}>
                            <IoIosCart style={{ color: '#fff', zIndex: '1000' }} />
                            <span style={{ margin: '0 10px', color: '#fff' }}>Cart</span>
                        </a>
                    </div>
                </div>

            </div>
            {modalSignUp()}
        </div >
    )
}

export default Header