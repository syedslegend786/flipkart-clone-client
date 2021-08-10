import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
//actions...
import { getProductByPageRealAction } from '../../../actions/product.actions'
import { getParams } from '../../../utils/getParams'
//react--responsive---crousel...
import Carousel, { autoplayPlugin, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
//style...
import './style.css'
const ProductByPageReal = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const location = useLocation()
    useEffect(() => {
        const params = getParams(location.search)
        console.log(params)
        dispatch(getProductByPageRealAction(params))
    }, [])
    console.log(product.pageBySlugPage)
    const { title, banners, products, description } = product.pageBySlugPage && product.pageBySlugPage
    const handleImgOnclick = (url) => {
        navigate(url)
    }
    const handleCheckOutProducts = (url) => {
        if (url) {
            navigate(url)
        }
    }
    if (product.pageBySlugPageLoading) {
        return <div>Loading</div>
    }
    return (
        <div>
            {banners && <Carousel
                plugins={[
                    'infinite',
                    {
                        resolve: autoplayPlugin,
                        options: {
                            interval: 2000,
                        }
                    },
                ]}
                animationSpeed={1000}
            >
                {
                    banners?.map((val, index) => (
                        <img
                            onClick={() => handleImgOnclick(val.navigateTo)}
                            style={{
                                width: '100%',
                                height: '300px',
                                objectFit: 'contain',
                                cursor: 'pointer',
                            }}
                            key={index} src={val.img} alt='' />
                    ))
                }
            </Carousel>}
            <div className='cont__card'>

                {
                    products?.map((val, index) => (
                        <div key={index} className='card__div'>
                            <img onClick={() => handleCheckOutProducts(val.navigateTo)} className='card__div__img' src={val.img} alt='' />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default ProductByPageReal
