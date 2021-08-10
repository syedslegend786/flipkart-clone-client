import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import './style.css'
import { addReviewAction, getProductDetailByProductIdAction } from '../../actions/product.actions';
import Layout from './../Layout/Layout'
import { publicUrl } from '../../helpers/getPublicUrl';
//
import { AiOutlineRight, AiOutlineStar, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiDollar } from 'react-icons/bi'
import { BsLightning } from 'react-icons/bs'
import { addToCartAction, loggedInuserAddToCart } from '../../actions/cart.actions';
//
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const ProductDetailPage = () => {
    const [rated, setRated] = useState(false)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const navigate = useNavigate()
    const [imgForPrev, setImgForPrev] = useState('');
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const auth = useSelector(state => state.auth)
    const { productSlug, productId } = useParams();
    useEffect(() => {
        dispatch(getProductDetailByProductIdAction(productId));
    }, [])
    // console.log(product?.productDetailPageData.product)
    const data = product?.productDetailPageData?.product
    // console.log(data?.productPictures)
    // console.log('maping through img', data?.productPictures[0].img);
    const myBreadCrumb = [
        { text: 'Home' },
        { text: <AiOutlineRight className='icon__class' /> },
        { text: 'Mobiles' },
        { text: <AiOutlineRight className='icon__class' /> },
        { text: data?.name }
    ]
    const handleAddToCart = () => {
        const { name, _id, price, productPictures } = product?.productDetailPageData.product
        const payload = {
            name,
            _id,
            productPictures: productPictures[0].img
        }
        if (auth.authenticate == true) {
            dispatch(loggedInuserAddToCart(payload));
            navigate('/cart')
        } else if (auth.authenticate === false) {
            dispatch(addToCartAction(payload))
            navigate('/cart');
        }
    }
    const ratingChanged = (e) => {
        setRating(e)
    }
    const handleReviewSubmit = () => {
        const payload = {
            "slug": productSlug,

            "review": review,
            "rating": rating,
        }
        dispatch(addReviewAction(payload))
            .then((v) => {
                if (v) {
                    setRating(0)
                    setReview('')
                    setRated(true)
                } else {

                }
            })
    }
    const handleRating = () => {

        const sumOfRating = product.productDetailPageData.product?.reviews.map((val) => parseInt(val.rating)).reduce((val, i) => (val += i), 0);
        const totalUserRated = product.productDetailPageData.product?.reviews.length
        const max_user_count_rating = totalUserRated * 5;
        const rating = (sumOfRating * 5) / max_user_count_rating;
        return rating;
    }
    return (
        <Layout>
            <>

                <div className='page'>
                    <div className='page__left'>
                        <div className='mobile'>
                            <div className='mobile__thumbnails'>
                                {
                                    data?.productPictures.map((val, index) => (
                                        <img
                                            // onClick={() => setImgForPrev(val.img)}
                                            onMouseEnter={() => setImgForPrev(val.img)}
                                            className='mobile__thumbnails__pic' key={index} src={publicUrl(val.img)} />
                                    ))
                                }
                            </div>
                            <div className='mobile__picture'>
                                {
                                    imgForPrev.length > 0 ?
                                        <img className='mobile__picture__prev' src={publicUrl(imgForPrev)} alt='' />
                                        :
                                        <img className='mobile__picture__prev' src={publicUrl(data?.productPictures[0].img)} alt='' />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='page__right'>
                        <div className='page__right__bread'>
                            {
                                myBreadCrumb.map((val, index) => (
                                    <span className='bread__span' key={index}>{val.text}</span>
                                ))
                            }
                        </div>
                        <div className='page__right__header'>
                            <h6>{data?.name}</h6>
                        </div>
                        <div className='rating__reviews'>
                            <div className='rating__green'>
                                {handleRating()}<AiOutlineStar style={{ color: 'orange' }} />
                            </div>
                            <span className='r__r__numbers'>
                                {product.productDetailPageData.product?.reviews.length}
                            </span>
                        </div>
                        <div className='price__section'>
                            <BiDollar className='dollar' />
                            <h3>{data?.price}</h3>
                        </div>
                        <div className='buttons__container'>
                            <button onClick={handleAddToCart} className='cart__buttons' >< AiOutlineShoppingCart className='cart__icon' /><span>Add to Cart</span></button>
                            <button className='cart__buttons'><BsLightning className='cart__icon' /> <span>Buy Now</span></button>
                        </div>

                        <div style={{ margin: '30px', border: '1px solid orange', padding: '10px' }}>
                            {
                                rated ? <div><h1>Thanks For Rating!!!</h1></div>
                                    :
                                    <>
                                        <div style={{ textAlign: 'center' }}><h1>RATE THIS PRODUCT</h1></div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <h6 style={{
                                                marginRight: '20px'
                                            }}>Rate product </h6>
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={24}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        {rating ?
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <h6>Add Review </h6>

                                                <input style={{ display: 'inline', marginLeft: '20px' }} value={review} onChange={(e) => setReview(e.target.value)} />
                                                {(rating || review) && <button onClick={handleReviewSubmit} style={{ marginLeft: '20px', cursor: 'pointer' }}>submit</button>}
                                            </div>
                                            :
                                            ''}
                                    </>
                            }
                        </div>


                    </div>
                </div>
                <div style={{ width: '100%', margin: '0', padding: '40px' }}>
                    {
                        product.productDetailPageData.product?.reviews.map((val, index) => {
                            return <div style={{}}>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <h6>{auth.user?.fullName}</h6>
                                    <ReactStars
                                        edit={false}
                                        value={parseInt(val.rating)}
                                        count={5}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                                <div>
                                    <h5 style={{ margin: '0', padding: '0s' }}>{val.review}</h5>
                                </div>
                            </div>
                        })
                    }
                </div>
            </>
        </Layout >
    )
}

export default ProductDetailPage
