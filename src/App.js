import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import Category from "./pages/Category";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DisclaimerPolicy from "./pages/DisclaimerPolicy";
import OrderTracking from "./pages/OrderTracking";
import Cart from "./pages/Cart";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import PopupBestSellers from "./pages/PopupBestSellers";


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
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
    </BrowserRouter>
  
  );
}

export default App;
