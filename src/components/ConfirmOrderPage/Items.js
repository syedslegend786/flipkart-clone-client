import React from 'react'
import { publicUrl } from '../../helpers/getPublicUrl'

const Items = ({ product, status }) => {
    console.log(product)

    return (
        <div className='items'>
            <div className='items__img'>
                <img src={publicUrl(product.pic)} alt='' />
                <p>{product.name}</p>
            </div>
            <div className='items__qty'>
                <p>{product.qty}</p>
            </div>
            <div className='items__price'>
                <p>{product.price}</p>
            </div>
            <div className='items__payment'>
                <p>{status}</p>
            </div>
        </div>
    )
}

export default Items
