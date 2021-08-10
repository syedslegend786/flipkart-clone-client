import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderDetailPageAction } from '../../actions/order.actions'
import Layout from '../Layout/Layout'
//
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const OrderDetailPage = () => {
    //

    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];
    //
    const dispatch = useDispatch()
    const { orderId, addressId } = useParams()
    const order = useSelector(state => state.order)
    useEffect(() => {
        dispatch(getOrderDetailPageAction(orderId, addressId));
    }, [])
    return (
        <Layout>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                <div style={{
                    padding: '20px',
                    width: '40%',
                }}>
                    <div style={{ borderBottom: '1px solid grey' }}>
                        <h5>Dilivery Address</h5>
                    </div>
                    {
                        Object.keys(order.orderDetailPageData).map((val) => {
                            return < div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{}}>{val}</span>{order.orderDetailPageData[val]}</div>
                        })
                    }
                </div>
                <div style={{
                    padding: '20px',
                    width: '40%',
                }}>
                    <div style={{ borderBottom: '1px solid grey' }}>
                        <h5>More Actions</h5>
                    </div>
                    <div>
                        <span>Download Invoice...</span>
                    </div>
                </div>
                <Dropdown options={options} onChange={() => { }} value={defaultOption} placeholder="Select an option" />;
            </div>
        </Layout >
    )
}

export default OrderDetailPage
