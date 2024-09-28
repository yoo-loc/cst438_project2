import React, { useState } from 'react';
import './App.css'; // Import the CSS
import SignUpForm from './components/SignUpForm'; // Ensure these are imported
import LoginForm from './components/LoginForm';

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false); // Ensure only one form shows at a time
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false); // Ensure only one form shows at a time
  };

  return (
    <div>
      <header className="navbar">
        <div className="logo">YOUR LOGO tesing landingPage branch</div>
        <nav className="nav-links">
          <button className="nav-button" onClick={handleLoginClick}>
            Log In
          </button>
          <button className="nav-button signup-button" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </nav>
      </header>

      {/* Render forms based on the button clicks */}
      <div className="form-container">
        {showSignUp && <SignUpForm />}
        {showLogin && <LoginForm />}
      </div>
    </div>
  );
};

export default App;
