import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import "./Login.css";

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

    // Email Validation
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

    // Password Validation
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
    <div className="page-background">
      <div className="card-container">
        {/* Logo Section */}
        <div className="logo-section">
          <img 
            src="/logo3.jpeg" 
            alt="ELORA Logo" 
            className="logo-image" 
          />
          <span className="logo-text">ELORA</span>
        </div>

        {/* Headings */}
        <h1 className="page-heading">Welcome Back</h1>
        <p className="subtext">Signin to continue</p>

        {/* Form */}
        <form onSubmit={handleLogin} noValidate>
          <div className="form-fields-container">
            {/* Email Field */}
            <div>
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                maxLength={100}
                className="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>

            {/* Password Field */}
            <div>
              <label className="field-label" htmlFor="password">
                Password
              </label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  minLength={8}
                  maxLength={20}
                  className="password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password-btn"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <FiEyeOff color="#6B7280" size={18} />
                  ) : (
                    <FiEye color="#6B7280" size={18} />
                  )}
                </button>
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
          </div>

          {/* Options Row */}
          <div className="options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox"
              />
              <span>Remember Me</span>
            </label>
            <span
              className="forgot-password-link"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>

        {/* Divider Row */}
        <div className="divider-row">
          <div className="divider-line" />
          <span className="divider-text">OR</span>
          <div className="divider-line" />
        </div>

        {/* Footer Row */}
        <div className="footer-row">
          <span className="footer-text">Don't have an account?</span>
          <span
            className="sign-up-link"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;