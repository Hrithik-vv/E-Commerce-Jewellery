import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BestSellerPage from './pages/BestSellerPage';
import CheckoutPage from './pages/CheckoutPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminProfilePage from './pages/AdminProfilePage';
import ProductListPage from './pages/ProductListPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import OrderListPage from './pages/OrderListPage';
import SingleOrderPage from './pages/SingleOrderPage';
import UserListPage from './pages/UserListPage';
import SingleUserDetailsPage from './pages/SingleUserDetailsPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from "../client/src/pages/Login";
import Home from "../client/src/pages/Home";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import Header from "../client/src/Components/Header";
import Footer from "../client/src/Components/Footer";
import About from "./pages/About";
import UserProfile from "../client/src/pages/UserProfile";
import SignUp from "../client/src/pages/SignUp";
import Contact from "../client/src/pages/Contact";
import Category from "../client/src/pages/Category";
import PrivacyPolicy from "../client/src/pages/PrivacyPolicy";
import DisclaimerPolicy from "../client/src/pages/DisclaimerPolicy";
import OrderTracking from "../client/src/pages/OrderTracking";
import Cart from "../client/src/pages/Cart";
import ShippingPolicy from "../client/src/pages/ShippingPolicy";
import RefundPolicy from "../client/src/pages/RefundPolicy";
import PopupBestSellers from "./pages/PopupBestSellers";


function App() {
  return (
    <Router>
 <Header/>
      <Routes>
        <Route path="/" element={<BestSellerPage />} />
        <Route path="/product" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/otp" element={<OTPVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin-profile" element={<AdminProfilePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/edit-product" element={<EditProductPage />} />
        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/order" element={<SingleOrderPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/user-details" element={<SingleUserDetailsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
         <Route path="/" element={<Home />} />
      <Route path="/login"element={<Login/>}/>
      <Route path="/about"element={<About/>}/>
      <Route path="/profile"element={<UserProfile/>}/>
      <Route path="/signup"element={<SignUp/>}/>
      <Route path="/contact"element={<Contact/>}/>
      <Route path="/category"element={<Category/>}/>
      <Route path="/privacy-policy"element={<PrivacyPolicy/>}/>
      <Route path="/disclaimer-policy"element={<DisclaimerPolicy/>}/>
      <Route path="/ordertracking"element={<OrderTracking/>}/>
      <Route path="/cart"element={<Cart/>}/>
      <Route path="/shipping-policy"element={<ShippingPolicy/>}/>
      <Route path="/refund-policy" element={<RefundPolicy/>}/>
      <Route path="/popup-best-sellers" element={<PopupBestSellers/>}/>

      </Routes>
        <ToastContainer position='top-right' autoClose={1500}/>
         <Footer/>
    </Router>
  );
}

export default App;
