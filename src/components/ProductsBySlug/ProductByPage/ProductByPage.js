import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { GetProductsBySlug } from '../../../actions/product.actions'
import { publicUrl } from '../../../helpers/getPublicUrl'

const ProductByPage = () => {
    const [productRange, setProductRange] = useState({
        products: 'All Products',
        productUnder5k: 'Product Under 5,000',
        productUnder10k: 'Product Under 10,000',
        productsUnder15k: 'Product Under 15,000',
        productsUnder20k: 'Product Under 20,000',
        productsUnder25k: 'Product Under 25,000',
    })
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const { slug } = useParams()
    useEffect(() => {
        dispatch(GetProductsBySlug(slug))
    }, [slug])
    return (
        <>
            {
                Object.keys(product.productsBySlug).map((p, index) => (
                    <div key={index} className='byslug'>
                        <div className='byslug__header'>
                            <h4>{productRange[p]}</h4>
                            <button>View All</button>
                        </div>
                        <div className='byslug__body'>
                            {
                                product.productsBySlug[p].map((productslug) => {
                                    return (
                                        <Link
                                            to={`/${productslug.slug}/${productslug._id}/store`}
                                            style={{
                                                display: 'block',
                                                textDecoration: 'none',
                                                color: 'black'
                                            }}
                                            className='byslug__body__item'>
                                            <img src={publicUrl(productslug.productPictures[0].img)} />
                                            <h5>{productslug.name}</h5>
                                            <h5>4.2</h5>
                                            <strong>{productslug.price}</strong>
                                        </Link>
                                    )
                                })
                            }

                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ProductByPage
