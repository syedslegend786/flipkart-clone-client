import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../Layout/Layout'
import Items from './Items'
import './style.css'
import { getOrdersActions } from '../../actions/order.actions'
import { Link, useNavigate } from 'react-router-dom'

const ConfirmOrderPage = () => {
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        if (!auth.authenticate) {
            navigate('/')
        }
    }, [auth.authenticate])

    const dispatch = useDispatch()
    const order = useSelector(state => state.order)
    useEffect(() => {
        dispatch(getOrdersActions())
    }, [])
    return (
        <Layout>
            {
                order.loading ? <div>Loading</div>
                    :
                    <div>
                        {
                            order.orders.map((val, index) => (
                                val.products.map((_val, _index) => {
                                    return <Link to={`/ordere/detail/${val._id}/${val.addressId}`}> <Items key={_index} product={_val} status={val.paymentStatus} /></Link>
                                })
                            ))
                        }
                    </div>
            }

        </Layout>
    )
}

export default ConfirmOrderPage
