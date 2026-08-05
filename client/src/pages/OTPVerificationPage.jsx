import React, { useState } from 'react';
import '../css/OTPVerificationPage.css';

export default function OTPVerificationPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email field is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Mock un-registered email error
    if (email === 'unregistered@test.com') {
      setError('Email address is not registered.');
      return;
    }

    setIsSubmitting(true);

    // Mock API call and redirect
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Code sent! Redirecting to OTP Verification page...');
      // Navigation would happen here
    }, 1000);
  };

  return (
    <div className="otp-page-wrapper">
      <div className="otp-card-container">
        
        {/* Section 2 – Logo/Icon Section */}
        <div className="otp-icon-container">
          <svg className="otp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        {/* Section 3 – Heading Section */}
        <div className="otp-message-section">
          <h1 className="otp-heading">Forgot Password</h1>
          <p className="otp-description">Enter your registered email address to receive a verification code.</p>
        </div>

        <form className="otp-form" onSubmit={handleSubmit}>
          {/* Section 4 – Email Input */}
          <div className="otp-input-group">
            <label className="otp-field-label">Email Address</label>
            <div className="otp-input-wrapper">
              <svg className="otp-mail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input 
                type="text" 
                className="otp-input-box" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
            {error && <span className="otp-error-message">{error}</span>}
          </div>

          {/* Section 5 – Send OTP Button */}
          <button 
            type="submit" 
            className="otp-primary-button"
            disabled={isSubmitting}
          >
            Send OTP
          </button>
        </form>

        {/* Section 6 – Footer Row */}
        <div className="otp-footer-row">
          <span className="otp-footer-text">Remember your password?</span>
          <a href="#" className="otp-sign-in-link">Sign In</a>
        </div>

      </div>
    </div>
  );
}
