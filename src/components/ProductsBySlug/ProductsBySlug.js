import React from 'react'
import { useLocation } from 'react-router-dom'
import { getParams } from '../../utils/getParams'
import Layout from '../Layout/Layout'
import ProductByPage from './ProductByPage/ProductByPage'
import ProductByPageReal from './ProductByPageReal/ProductByPageReal'
import ProductBySimpleShow from './ProductBySimpleShow/ProductBySimpleShow'
import './style.css'


const ProductsBySlug = (props) => {
    const location = useLocation()
    const renderProps = () => {
        const param = getParams(location.search)
        console.log(param)
        let componentToRender = null;
        switch (param.type) {
            case 'store':
                componentToRender = <ProductByPage {...props} />
                break;
            case 'page':
                componentToRender = <ProductByPageReal />
                break;
            default:
                componentToRender = <ProductBySimpleShow />
        }
        return componentToRender;
    }
    return (
        <div>
            <Layout>
                {
                    renderProps()
                }
            </Layout>
        </div>
    )
}
export default ProductsBySlug

