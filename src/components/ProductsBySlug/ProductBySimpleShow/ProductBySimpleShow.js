import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { GetProductsBySlug } from '../../../actions/product.actions'
import { publicUrl } from '../../../helpers/getPublicUrl'
import { getParams } from '../../../utils/getParams'

const ProductBySimpleShow = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    console.log(slug)
    useEffect(() => {
        dispatch(GetProductsBySlug(slug))
    }, [])
    console.log(product.productsBySlug.products)
    return (
        <>
            {
                product.productsBySlug.products &&
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderTop: '10px solid #FECF48',
                    borderLeft: '10px solid #FECF48',
                    borderRight: '10px solid #FECF48',
                    padding: '10px',
                    flexWrap: 'wrap',
                    alignContent: 'center'
                }}>
                    {product.productsBySlug.products.map((productslug, index) => (
                        <Link
                            to={`/${productslug.slug}/${productslug._id}/store`}
                            style={{
                                display: 'block'
                            }}
                            className='byslug__body__item'>
                            <img src={publicUrl(productslug.productPictures[0].img)} />
                            <h5>{productslug.name}</h5>
                            <h5>4.2</h5>
                            <strong>{productslug.price}</strong>
                        </Link>
                    ))}
                </div>
            }
        </>

    )
}

export default ProductBySimpleShow
