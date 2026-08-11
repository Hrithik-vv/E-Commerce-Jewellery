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

function App() {
  return (
    <Router>

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
      </Routes>
    </Router>
  );
}

export default App;
