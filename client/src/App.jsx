import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BestSellerPage from './pages/BestSellerPage';
import CheckoutPage from './pages/CheckoutPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <Router>
      {/* <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
        <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', margin: 0, padding: 0 }}>
          <li><Link to="/">Home (Best Sellers)</Link></li>
          <li><Link to="/product">Product Details</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/otp">OTP Verification</Link></li>
          <li><Link to="/reset-password">Reset Password</Link></li>
        </ul>
      </nav> */}
      
      <Routes>
        <Route path="/" element={<BestSellerPage />} />
        <Route path="/product" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/otp" element={<OTPVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
