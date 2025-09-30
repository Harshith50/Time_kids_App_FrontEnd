import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './AdminAuth.css';

export default function AdminAuth() {
  const [isSignIn, setIsSignIn] = useState(true);

  // Login state
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [showLogInPassword, setShowLogInPassword] = useState(false);
  const [logInEmailError, setLogInEmailError] = useState("");

  // Sign Up state
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpEmailError, setSignUpEmailError] = useState("");

  // Logged in state based on presence of token in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:5000/api/user";

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Login email input change handler
  const handleLogInEmailChange = (e) => {
    const email = e.target.value;
    setLogInEmail(email);

    if (email && !validateEmail(email)) {
      setLogInEmailError("Please enter a valid email address");
    } else {
      setLogInEmailError("");
    }
  };

  // Signup email input change handler
  const handleSignUpEmailChange = (e) => {
    const email = e.target.value;
    setSignUpEmail(email);

    if (email && !validateEmail(email)) {
      setSignUpEmailError("Please enter a valid email address");
    } else {
      setSignUpEmailError("");
    }
  };

  // Handle login submit
  const handleSignInSubmit = async () => {
    if (!logInEmail) {
      setLogInEmailError("Email is required");
      return;
    }

    if (!validateEmail(logInEmail)) {
      setLogInEmailError("Please enter a valid email address");
      return;
    }

    if (!logInPassword) {
      alert("Password is required");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: logInEmail,
        password: logInPassword,
      });

      alert("Login successful!");

      // Save token and update login state
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      alert(message);
    }
  };

  // Handle signup submit
  const handleSignUpSubmit = async () => {
    if (!signUpUsername) {
      alert("Username is required");
      return;
    }

    if (!signUpEmail) {
      setSignUpEmailError("Email is required");
      return;
    }

    if (!validateEmail(signUpEmail)) {
      setSignUpEmailError("Please enter a valid email address");
      return;
    }

    if (!signUpPassword) {
      alert("Password is required");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
      });

      alert("Signup successful!");

      // Save token and update login state
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      alert(message);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsSignIn(true);
    alert("Logged out successfully");
  };

  // Render
  return (
    <div className="auth-container">
      <div className="form-card">
        {isLoggedIn ? (
          <div className="logged-in-container">
            <h2>You are logged in as Admin.</h2>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* Toggle Tabs */}
            <div className="tab-container">
              <button
                onClick={() => setIsSignIn(true)}
                className={`tab ${isSignIn ? "active" : "inactive"}`}
              >
                Admin Login
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`tab ${!isSignIn ? "active" : "inactive"}`}
              >
                Admin Signup
              </button>
            </div>

            {isSignIn ? (
              // Login Form
              <div>
                <h1 className="title">Login</h1>
                <div className="form-container">
                  <div className="field-group">
                    <label htmlFor="signInEmail" className="label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="signInEmail"
                      value={logInEmail}
                      onChange={handleLogInEmailChange}
                      placeholder="Enter your email"
                      className={`input ${logInEmailError ? "error" : ""}`}
                    />
                    {logInEmailError && (
                      <span className="error-message">{logInEmailError}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="signInPassword" className="label">
                      Password
                    </label>
                    <input
                      type={showLogInPassword ? "text" : "password"}
                      id="signInPassword"
                      value={logInPassword}
                      onChange={(e) => setLogInPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="input"
                    />
                  </div>

                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="showSignInPassword"
                      checked={showLogInPassword}
                      onChange={(e) => setShowLogInPassword(e.target.checked)}
                      className="checkbox"
                    />
                    <label
                      htmlFor="showSignInPassword"
                      className="checkbox-label"
                    >
                      Show password
                    </label>
                  </div>

                  <button
                    onClick={handleSignInSubmit}
                    className="submit-button"
                  >
                    Log In
                  </button>
                </div>
              </div>
            ) : (
              // Signup Form
              <div>
                <h1 className="title">Admin Signup</h1>
                <div className="form-container">
                  <div className="field-group">
                    <label htmlFor="signUpUsername" className="label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="signUpUsername"
                      value={signUpUsername}
                      onChange={(e) => setSignUpUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="input"
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="signUpEmail" className="label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="signUpEmail"
                      value={signUpEmail}
                      onChange={handleSignUpEmailChange}
                      placeholder="Enter your email"
                      className={`input ${signUpEmailError ? "error" : ""}`}
                    />
                    {signUpEmailError && (
                      <span className="error-message">{signUpEmailError}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="signUpPassword" className="label">
                      Password
                    </label>
                    <input
                      type={showSignUpPassword ? "text" : "password"}
                      id="signUpPassword"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="input"
                    />
                  </div>

                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="showSignUpPassword"
                      checked={showSignUpPassword}
                      onChange={(e) => setShowSignUpPassword(e.target.checked)}
                      className="checkbox"
                    />
                    <label
                      htmlFor="showSignUpPassword"
                      className="checkbox-label"
                    >
                      Show password
                    </label>
                  </div>

                  <button
                    onClick={handleSignUpSubmit}
                    className="submit-button"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
