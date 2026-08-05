import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  // State Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation Message State
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    let isValid = true;
    setEmailError("");
    setPasswordError("");

    const trimmedEmail = email.trim();
    setEmail(trimmedEmail);

    // Email Validation (BRD Specific)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (trimmedEmail.length > 100) {
      setEmailError("Email cannot exceed 100 characters.");
      isValid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // Password Validation (BRD Specific)
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8 || password.length > 20) {
      setPasswordError("Password must be 8-20 characters long.");
      isValid = false;
    } else if (/\s/.test(password)) {
      setPasswordError("Spaces are not allowed in password.");
      isValid = false;
    }

    // Backend API Call
    if (isValid) {
      try {
        // ⚠️ ശ്രദ്ധിക്കുക: നിങ്ങളുടെ ബാക്കെൻഡ് റൺ ചെയ്യുന്ന കൃത്യമായ Port & Route ഇവിടെ നൽകുക
const response = await axios.post(
  "http://localhost:5000/api/auth/signin",
  {
    email: trimmedEmail,
    password: password,
  }
);

        if (response.data.success) {
          toast.success(response.data.message || "Login Successful!");

          // Store Access Token & User Details
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("isLoggedIn", "true");

          if (rememberMe) {
            localStorage.setItem("rememberedUser", trimmedEmail);
          }

          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Unable to connect to the backend server.");
        }
      }
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.cardContainer}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <img 
            src="/logo3.jpeg" 
            alt="ELORA Logo" 
            style={styles.logoImage} 
          />
          <span style={styles.logoText}>ELORA</span>
        </div>

        {/* Headings */}
        <h1 style={styles.pageHeading}>Welcome Back</h1>
        <p style={styles.subtext}>Signin to continue</p>

        {/* Form */}
        <form onSubmit={handleLogin} noValidate>
          <div style={styles.formFieldsContainer}>
            {/* Email Field */}
            <div>
              <label style={styles.fieldLabel} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                maxLength={100}
                style={styles.emailInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <div style={styles.errorMessage}>{emailError}</div>}
            </div>

            {/* Password Field */}
            <div>
              <label style={styles.fieldLabel} htmlFor="password">
                Password
              </label>
              <div style={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  minLength={8}
                  maxLength={20}
                  style={styles.passwordInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.togglePasswordBtn}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <FiEyeOff color="#6B7280" size={18} />
                  ) : (
                    <FiEye color="#6B7280" size={18} />
                  )}
                </button>
              </div>
              {passwordError && <div style={styles.errorMessage}>{passwordError}</div>}
            </div>
          </div>

          {/* Options Row */}
          <div style={styles.optionsRow}>
            <label style={styles.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              <span>Remember Me</span>
            </label>
            <span
              style={styles.forgotPasswordLink}
              onClick={() => navigate("/forgot-password")}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Forgot Password?
            </span>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            style={styles.signInButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0B5D50")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#134E4A")}
          >
            Sign In
          </button>
        </form>

        {/* Divider Row */}
        <div style={styles.dividerRow}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Footer Row */}
        <div style={styles.footerRow}>
          <span style={styles.footerText}>Don't have an account?</span>
          <span
            style={styles.signUpLink}
            onClick={() => navigate("/signup")}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

// Exact Inline Styles
const styles = {
  pageBackground: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#FBF8F3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    boxSizing: "border-box",
  },
  cardContainer: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    padding: "40px 36px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
    boxSizing: "border-box",
  },
  logoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    marginBottom: "28px",
  },
  logoImage: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  logoText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#134E4A",
    letterSpacing: "1px",
  },
  pageHeading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "26px",
    fontWeight: 700,
    color: "#134E4A",
    textAlign: "center",
    marginBottom: "6px",
  },
  subtext: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: "28px",
  },
  formFieldsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "12px",
  },
  fieldLabel: {
    display: "block",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: "#374151",
    marginBottom: "6px",
  },
  emailInput: {
    width: "100%",
    height: "44px",
    padding: "0 14px",
    border: "1px solid #D1D5DB",
    borderRadius: "10px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    backgroundColor: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
  },
  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    width: "100%",
    height: "44px",
    padding: "0 40px 0 14px",
    border: "1px solid #D1D5DB",
    borderRadius: "10px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    backgroundColor: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
  },
  togglePasswordBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "12px",
    color: "#DC2626",
    marginTop: "4px",
  },
  optionsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "22px",
    marginTop: "8px",
  },
  rememberMe: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "13px",
    color: "#374151",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
    accentColor: "#134E4A",
  },
  forgotPasswordLink: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#0B5D50",
    cursor: "pointer",
  },
  signInButton: {
    width: "100%",
    height: "46px",
    backgroundColor: "#134E4A",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "24px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginBottom: "18px",
  },
  dividerRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: "#9CA3AF",
  },
  footerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  },
  footerText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: "#6B7280",
  },
  signUpLink: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#0B5D50",
    cursor: "pointer",
  },
};

export default Login;