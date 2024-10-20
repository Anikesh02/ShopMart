
import { Navigate, Route, Routes } from 'react-router-dom'
import AddProducts from '../admin/AddProducts'
import AllProducts from '../admin/AllProducts'
import Dashboard from '../admin/Dashboard'
import OrderDetails from '../admin/OrderDetails'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProductDetails from '../pages/ProductDetails'
import Shop from '../pages/Shop'
import Signup from '../pages/Signup'
import ProtectedRoute from './ProtectedRoute'
import MyOrders from '../pages/MyOrders'
import Payment from '../pages/Payment'


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:id" element={<ProductDetails />} />
            <Route path="checkout" element={
                <Checkout />
            } />
            <Route path="cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />


            <Route path="/*" element={<ProtectedRoute />}>
                <Route path='checkout' element={<Checkout />} />
                <Route path='cart' element={<Cart />} />
                <Route path='myOrders' element={<MyOrders />} />
                <Route path='dashboard/' element={<Dashboard/>} />
                <Route path='dashboard/all-products' element={<AllProducts />} />
                <Route path='dashboard/add-product' element={<AddProducts />} />
                <Route path='dashboard/add-product' element={<AddProducts />} />
                <Route path='dashboard/orders' element={<OrderDetails/>} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
        </Routes>
    );
}

export default Routers