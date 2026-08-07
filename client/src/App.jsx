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
      </Routes>
    </Router>
  );
}

export default App;
