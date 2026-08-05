import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const regex = /^[A-Za-z\s'\-]{3,50}$/;
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
  const handleSubmit = (e) => {
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
      alert('Account Created Successfully!');
      navigate('/login'); 
    }

    // Final check
    if (!errors.fullName && !errors.email && !errors.password && !errors.confirmPassword) {
      alert('Account Created Successfully!');
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.cardContainer}>
        {/* Logo Section - Pure Clean BRD Style */}
        <div style={styles.logoSection}>
          <div style={styles.logoMark}>L</div>
          <div style={styles.logoText}>ELORA</div>
        </div>

        {/* Page Heading & Subtext */}
        <h1 style={styles.pageHeading}>Create Your Account</h1>
        <p style={styles.subtext}>Join us today to get started with your journey</p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.formFieldsContainer}>
            {/* Full Name */}
            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel} htmlFor="fullName">
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
                style={styles.inputField}
                required
              />
              {errors.fullName && <span style={styles.errorMessage}>{errors.fullName}</span>}
            </div>

            {/* Email Input */}
            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel} htmlFor="email">
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
                style={styles.inputField}
                required
              />
              {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
            </div>

            {/* Password Input */}
            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel} htmlFor="password">
                Password
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  maxLength={20}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ ...styles.inputField, paddingRight: '45px' }}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.togglePassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>
              {passwordStrength && (
                <span
                  style={{
                    ...styles.strengthIndicator,
                    color:
                      passwordStrength === 'Strong'
                        ? '#059669'
                        : passwordStrength === 'Medium'
                        ? '#D97706'
                        : '#DC2626',
                  }}
                >
                  Strength: {passwordStrength}
                </span>
              )}
              {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
            </div>

            {/* Confirm Password Input */}
            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{ ...styles.inputField, paddingRight: '45px' }}
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.togglePassword}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </span>
              </div>
              {errors.confirmPassword && (
                <span style={styles.errorMessage}>{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* Consent Row */}
          <div style={styles.consentRow}>
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              style={styles.checkbox}
              required
            />
            <label htmlFor="consent" style={styles.consentText}>
              I accept the{' '}
              <a href="#terms" style={styles.link}>
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="#privacy" style={styles.link}>
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.consent && (
            <span style={{ ...styles.errorMessage, display: 'block', marginTop: '-14px', marginBottom: '14px' }}>
              {errors.consent}
            </span>
          )}

          {/* Create Account Button */}
          <button type="submit" style={styles.createAccountBtn}>
            Create Account
          </button>
          

          {/* Divider Row */}
          <div style={styles.dividerRow}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>OR</span>
            <div style={styles.dividerLine} />
          </div>

          {/* Footer Row */}
          <div style={styles.footerRow}>
            <span style={styles.footerText}>Already have an account?</span>
            <a href="#signin" style={styles.signInLink}>
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

// Exact Style Definitions based on BRD Specifications
const styles = {
  pageBackground: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FBF8F3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    boxSizing: 'border-box',
    fontFamily: 'Poppins, sans-serif',
  },
  cardContainer: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '16px',
    padding: '40px 36px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    boxSizing: 'border-box',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '28px',
  },
  logoMark: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#134E4A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontFamily: 'Cormorant Garamond, serif',
    fontWeight: '700',
    fontSize: '20px',
  },
  logoText: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '22px',
    fontWeight: '700',
    color: '#134E4A',
    letterSpacing: '1px',
  },
  pageHeading: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '26px',
    fontWeight: '700',
    color: '#134E4A',
    textAlign: 'center',
    marginBottom: '6px',
  },
  subtext: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    fontWeight: '400',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: '28px',
  },
  formFieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '13px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputField: {
    width: '100%',
    height: '44px',
    padding: '0 14px',
    border: '1px solid #D1D5DB',
    borderRadius: '10px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    backgroundColor: '#FFFFFF',
    outline: 'none',
    boxSizing: 'border-box',
  },
  togglePassword: {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#6B7280',
    userSelect: 'none',
  },
  errorMessage: {
    fontSize: '11px',
    color: '#DC2626',
    marginTop: '4px',
  },
  strengthIndicator: {
    fontSize: '11px',
    marginTop: '4px',
    fontWeight: '500',
  },
  consentRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '22px',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    marginTop: '3px',
    cursor: 'pointer',
  },
  consentText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '12.5px',
    fontWeight: '400',
    color: '#6B7280',
    lineHeight: '1.5',
  },
  link: {
    color: '#0B5D50',
    textDecoration: 'none',
  },
  createAccountBtn: {
    width: '100%',
    height: '46px',
    backgroundColor: '#134E4A',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '24px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '18px',
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '18px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    color: '#9CA3AF',
  },
  footerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  },
  footerText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '13px',
    fontWeight: '400',
    color: '#6B7280',
  },
  signInLink: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '13px',
    fontWeight: '500',
    color: '#0B5D50',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};

export default SignUp;