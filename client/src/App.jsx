import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminLayout from './Components/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import Category from './pages/Category';
import UserProfile from './pages/UserProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DisclaimerPolicy from './pages/DisclaimerPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import OrderTracking from './pages/OrderTracking';
import Cart from './pages/Cart';
import PopupBestSellers from './Components/PopupBestSellers';
import BestSellerPage from './pages/BestSellerPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfilePage from './pages/AdminProfilePage';
import ProductListPage from './pages/ProductListPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import OrderListPage from './pages/OrderListPage';
import SingleOrderPage from './pages/SingleOrderPage';
import UserListPage from './pages/UserListPage';
import SingleUserDetailsPage from './pages/SingleUserDetailsPage';
import ProtectedRoute from './utils/ProtectedRoute';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from './utils/CartContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const adminRoutes = [
    '/admin-dashboard',
    '/admin-profile',
    '/products',
    '/add-product',
    '/edit-product',
    '/orders',
    '/order',
    '/users',
    '/user-details',
  ];

  const isAdminRoute = adminRoutes.some(route => location.pathname.startsWith(route));

  if (isAdminRoute) {
    return (
      <AdminLayout>
        {children}
        <ToastContainer position='top-right' autoClose={1500} />
      </AdminLayout>
    );
  }

  return (
    <>
      <Header />
      {children}
      <ToastContainer position='top-right' autoClose={1500} />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/best-sellers" element={<BestSellerPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/otp" element={<OTPVerificationPage />} />
            <Route path="/forgot-password" element={<OTPVerificationPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer-policy" element={<DisclaimerPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/popup-best-sellers" element={<PopupBestSellers />} />

            {/* Protected Pages – require authentication */}
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccessPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/ordertracking" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />

            {/* Admin Pages */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-profile" element={<AdminProfilePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />
            <Route path="/orders" element={<OrderListPage />} />
            <Route path="/order/:id" element={<SingleOrderPage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/user-details/:id" element={<SingleUserDetailsPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;
