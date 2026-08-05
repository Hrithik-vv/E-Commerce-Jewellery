import React, { useState, useEffect } from 'react';
import '../css/ResetPasswordPage.css';

export default function ResetPasswordPage() {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock token validation on load
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    if (token === 'invalid') {
      setIsTokenValid(false);
    }
  }, []);

  const validatePassword = (pass) => {
    if (!pass) return "New Password is required.";
    if (pass.length < 8) return "Password must be at least 8 characters.";
    if (pass.length > 20) return "Password cannot exceed 20 characters.";
    if (!/[A-Z]/.test(pass)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pass)) return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(pass)) return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) return "Password must contain at least one special character.";
    if (/\s/.test(pass)) return "Spaces are not allowed.";
    return "";
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordError(validatePassword(val));
    
    // Check confirm password match in real time if it has been touched
    if (confirmPassword) {
      if (val !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    
    if (!val) {
      setConfirmPasswordError("Confirm Password is required.");
    } else if (val !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const passError = validatePassword(password);
    setPasswordError(passError);
    
    let confError = "";
    if (!confirmPassword) {
      confError = "Confirm Password is required.";
    } else if (confirmPassword !== password) {
      confError = "Passwords do not match.";
    }
    setConfirmPasswordError(confError);

    if (passError || confError) {
      return;
    }

    setIsSubmitting(true);

    // Mock API call and redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        alert('Redirecting to Sign In page...');
      }, 1500);
    }, 1000);
  };

  if (!isTokenValid) {
    return (
      <div className="reset-page-wrapper">
        <div className="reset-card-container">
          <div className="reset-message-section">
            <h1 className="reset-heading">Invalid Link</h1>
            <p className="reset-description">This password reset link is invalid or has expired.</p>
          </div>
          <a href="#" className="reset-primary-button" style={{ textDecoration: 'none' }}>
            Go to Forgot Password
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-page-wrapper">
      <div className="reset-card-container">
        
        {/* Section 2 – Logo/Icon Section */}
        <div className="reset-icon-container">
          <svg className="reset-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        {/* Section 3 – Heading Section */}
        <div className="reset-message-section">
          <h1 className="reset-heading">Reset Your Password</h1>
          <p className="reset-description">Create a new password that's at least 8 characters long.</p>
        </div>

        {isSuccess ? (
          <div className="reset-success-message">
            Password has been successfully reset!
          </div>
        ) : (
          <form className="reset-form" onSubmit={handleSubmit}>
            {/* Section 4 – New Password Input */}
            <div className="reset-input-group">
              <label className="reset-field-label">New Password</label>
              <div className="reset-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="reset-input-box" 
                  placeholder="Create a new password" 
                  value={password}
                  onChange={handlePasswordChange}
                />
                <svg 
                  className="reset-show-hide-icon" 
                  onClick={() => setShowPassword(!showPassword)}
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  {showPassword ? (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </>
                  ) : (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </>
                  )}
                </svg>
              </div>
              {passwordError && <span className="reset-error-message">{passwordError}</span>}
            </div>

            {/* Section 5 – Confirm Password Input */}
            <div className="reset-input-group">
              <label className="reset-field-label">Confirm Password</label>
              <div className="reset-input-wrapper">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="reset-input-box" 
                  placeholder="Confirm your new password" 
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <svg 
                  className="reset-show-hide-icon" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  {showConfirmPassword ? (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </>
                  ) : (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </>
                  )}
                </svg>
              </div>
              {confirmPasswordError && <span className="reset-error-message">{confirmPasswordError}</span>}
            </div>

            {/* Section 6 – Reset Password Button */}
            <button 
              type="submit" 
              className="reset-primary-button"
              disabled={isSubmitting}
            >
              Reset Password
            </button>
          </form>
        )}

        {/* Section 7 – Footer Row */}
        <div className="reset-footer-row">
          <span className="reset-footer-text">Remember your password?</span>
          <a href="#" className="reset-sign-in-link">Sign In</a>
        </div>

      </div>
    </div>
  );
}
