import React, { useEffect } from 'react';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductsBySlug from './components/ProductsBySlug/ProductsBySlug';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { keepUserLogin } from './actions/auth.actions';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import CartPage from './components/CartPage/CartPage';
import { keepCartAdded, loggedInUserGetCatItems } from './actions/cart.actions';
import CheckOutPage from './components/CheckOutPage/CheckOutPage';
import ConfirmOrderPage from './components/ConfirmOrderPage/ConfirmOrderPage';
import OrderDetailPage from './components/OrderDetailPage.js/OrderDetailPage';
function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(keepCartAdded())
    }
  }, [auth.authenticate])
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(keepUserLogin());

    }
  }, [auth.authenticate])

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:slug' element={<ProductsBySlug />} />
          <Route path='/:productSlug/:productId/store' element={<ProductDetailPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckOutPage />} />
          <Route path='/orderplaced' element={<ConfirmOrderPage />} />
          <Route path='/ordere/detail/:orderId/:addressId' element={<OrderDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
