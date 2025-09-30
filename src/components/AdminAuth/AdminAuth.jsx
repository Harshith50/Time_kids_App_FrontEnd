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

  // Use relative URL for Vercel API
  const API_BASE_URL = "https://time-kids-app-backend.vercel.app/"

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handlers
  const handleLogInEmailChange = (e) => {
    const email = e.target.value;
    setLogInEmail(email);
    setLogInEmailError(email && !validateEmail(email) ? "Please enter a valid email address" : "");
  };

  const handleSignUpEmailChange = (e) => {
    const email = e.target.value;
    setSignUpEmail(email);
    setSignUpEmailError(email && !validateEmail(email) ? "Please enter a valid email address" : "");
  };

  const handleSignInSubmit = async () => {
    if (!logInEmail || !validateEmail(logInEmail)) return setLogInEmailError("Valid email required");
    if (!logInPassword) return alert("Password is required");

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: logInEmail,
        password: logInPassword,
      });

      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignUpSubmit = async () => {
    if (!signUpUsername) return alert("Username is required");
    if (!signUpEmail || !validateEmail(signUpEmail)) return setSignUpEmailError("Valid email required");
    if (!signUpPassword) return alert("Password is required");

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
      });

      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsSignIn(true);
    alert("Logged out successfully");
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        {isLoggedIn ? (
          <div className="logged-in-container">
            <h2>You are logged in as Admin.</h2>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <>
            <div className="tab-container">
              <button onClick={() => setIsSignIn(true)} className={isSignIn ? "active" : ""}>Admin Login</button>
              <button onClick={() => setIsSignIn(false)} className={!isSignIn ? "active" : ""}>Admin Signup</button>
            </div>

            {isSignIn ? (
              <div>
                <h1 className="title">Login</h1>
                <input type="email" value={logInEmail} onChange={handleLogInEmailChange} placeholder="Email" />
                {logInEmailError && <span>{logInEmailError}</span>}
                <input type={showLogInPassword ? "text" : "password"} value={logInPassword} onChange={(e) => setLogInPassword(e.target.value)} placeholder="Password" />
                <label>
                  <input type="checkbox" checked={showLogInPassword} onChange={(e) => setShowLogInPassword(e.target.checked)} /> Show password
                </label>
                <button onClick={handleSignInSubmit}>Log In</button>
              </div>
            ) : (
              <div>
                <h1 className="title">Admin Signup</h1>
                <input type="text" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} placeholder="Username" />
                <input type="email" value={signUpEmail} onChange={handleSignUpEmailChange} placeholder="Email" />
                {signUpEmailError && <span>{signUpEmailError}</span>}
                <input type={showSignUpPassword ? "text" : "password"} value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} placeholder="Password" />
                <label>
                  <input type="checkbox" checked={showSignUpPassword} onChange={(e) => setShowSignUpPassword(e.target.checked)} /> Show password
                </label>
                <button onClick={handleSignUpSubmit}>Sign Up</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
