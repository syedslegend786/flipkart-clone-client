import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCatagories } from '../../actions/catagory.actions'
import { Link } from 'react-router-dom'
import './style.css'
const MenuHeader = () => {
    const dispatch = useDispatch()
    const catagory = useSelector(state => state.catagory)
    useEffect(() => {
        dispatch(getAllCatagories())
    }, [])
    const myUpdateCatgoryList = (catagories) => {
        let store = []
        for (let cat of catagories) {
            store.push(
                <li key={cat.name}>
                    {cat.parentId ? <Link to={`/${cat.slug}?cid=${cat._id}&type=${cat.type}`}>{cat.name}</Link> : <span>{cat.name}</span>}
                    {cat.children.length > 0 && <ul>{myUpdateCatgoryList(cat.children, store)}</ul>}
                </li>
            )
            if (cat.children.length > 0) {
                myUpdateCatgoryList(cat.children, store);
            }
        }
        return store;
    }
    return (
        <div className='menuheader'>
            <ul>
                {
                    myUpdateCatgoryList(catagory.catagoryList)
                }
            </ul>
        </div>
    )
}

export default MenuHeader
