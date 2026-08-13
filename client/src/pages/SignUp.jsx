import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import '../css/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  // Form Field States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    consent: false,
  });

  // UI Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation Error States
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Real-time validations
    if (name === 'password') {
      checkPasswordStrength(value);
      if (formData.confirmPassword) {
        validateConfirmPassword(value, formData.confirmPassword);
      }
    }

    if (name === 'confirmPassword') {
      validateConfirmPassword(formData.password, value);
    }
  };

  // Password Strength Calculation
  const checkPasswordStrength = (val) => {
    const lengthValid = val.length >= 8 && val.length <= 20;
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);
    const noSpace = !/\s/.test(val);

    const isValid = lengthValid && hasUpper && hasLower && hasNumber && hasSpecial && noSpace;

    if (!val) {
      setPasswordStrength('');
    } else if (isValid) {
      setPasswordStrength('Strong');
    } else if (val.length >= 6 && (hasUpper || hasNumber)) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  // Confirm Password Check
  const validateConfirmPassword = (pass, confirmPass) => {
    if (pass !== confirmPass) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  // Field Blur Validations
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'fullName') {
      const trimmed = value.trim();
      const regex = /^[A-Za-z\s'-]{3,50}$/;
      if (!regex.test(trimmed)) {
        setErrors((prev) => ({
          ...prev,
          fullName: 'Please enter a valid name (3-50 letters/spaces only).',
        }));
      } else {
        setErrors((prev) => ({ ...prev, fullName: '' }));
      }
    }

    if (name === 'email') {
      const lowercased = value.toLowerCase();
      setFormData((prev) => ({ ...prev, email: lowercased }));
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(lowercased) || lowercased.length > 100) {
        setErrors((prev) => ({
          ...prev,
          email: 'Please enter a valid email address.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    }

    if (name === 'password') {
      const val = value;
      const isValid =
        val.length >= 8 &&
        val.length <= 20 &&
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(val) &&
        !/\s/.test(val);

      if (!isValid) {
        setErrors((prev) => ({
          ...prev,
          password: 'Must be 8-20 chars with upper, lower, number & special char.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check consent
    if (!formData.consent) {
      setErrors((prev) => ({
        ...prev,
        consent: 'You must accept the terms and policies to continue.',
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, consent: '' }));
    }

    if (!errors.fullName && !errors.email && !errors.password && !errors.confirmPassword) {
      setIsSubmitting(true);
      try {
        const payload = {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          consent: formData.consent,
        };
        const response = await api.post("/auth/signup", payload);
        if (response.success) {
          toast.success(response.message || 'Account Created Successfully!');
          navigate('/login');
        }
      } catch (err) {
        toast.error(err.message || "Failed to create account. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="page-background">
      <div className="card-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-mark">L</div>
          <div className="logo-text">ELORA</div>
        </div>

        {/* Page Heading & Subtext */}
        <h1 className="page-heading">Create Your Account</h1>
        <p className="subtext">Join us today to get started with your journey</p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-fields-container">
            {/* Full Name */}
            <div className="field-group">
              <label className="field-label" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                maxLength={50}
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input-field"
                required
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            {/* Email Input */}
            <div className="field-group">
              <label className="field-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                maxLength={100}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input-field"
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Password Input */}
            <div className="field-group">
              <label className="field-label" htmlFor="password">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  maxLength={20}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-field input-field-padded"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>
              {passwordStrength && (
                <span
                  className={`strength-indicator ${
                    passwordStrength === 'Strong'
                      ? 'strength-strong'
                      : passwordStrength === 'Medium'
                      ? 'strength-medium'
                      : 'strength-weak'
                  }`}
                >
                  Strength: {passwordStrength}
                </span>
              )}
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Confirm Password Input */}
            <div className="field-group">
              <label className="field-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field input-field-padded"
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* Consent Row */}
          <div className="consent-row">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="checkbox"
              required
            />
            <label htmlFor="consent" className="consent-text">
              I accept the{' '}
              <a href="#terms" className="link">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="#privacy" className="link">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.consent && (
            <span className="error-message error-message-consent">
              {errors.consent}
            </span>
          )}

          {/* Create Account Button */}
          <button type="submit" className="create-account-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Divider Row */}
          <div className="divider-row">
            <div className="divider-line" />
            <span className="divider-text">OR</span>
            <div className="divider-line" />
          </div>

          {/* Footer Row */}
          <div className="footer-row">
            <span className="footer-text">Already have an account?</span>
            <span 
              className="sign-in-link" 
              onClick={() => navigate('/login')}
              style={{ cursor: 'pointer' }}
            >
              Sign In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;