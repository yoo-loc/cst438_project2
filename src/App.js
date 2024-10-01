import React, { useState } from 'react';
import './App.css'; // Import the CSS
import SignUpForm from './components/SignUpForm'; // Ensure these are imported
import LoginForm from './components/LoginForm';
import WishlistHome from "./components/WishlistHome";
import GiftIdeas from "./components/GiftIdeas";
import  { BrowserRouter as Router, Route, Switch, Link, Routes} from "react-router-dom";

const App = () => {
  // const [showSignUp, setShowSignUp] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);

  // const handleSignUpClick = () => {
  //   setShowSignUp(true);
  //   setShowLogin(false); // Ensure only one form shows at a time
  // };
  // const handlewishlistClick = () => {
  //   // Navigate to the wishlist page if logged in, otherwise show the login form
  //   if (isLoggedIn) {
  //     <a href="./WishlistHome"></a>
  //   } else {
  //     setShowLogin(true);
  //     setShowSignUp(false);
  //   }
  // };
  // const handleGiftIdeasClick = () => {
  //   // Page should display randomly generated gift ideas from the database
  //   <a href="./GiftIdeas"></a>
  //     setShowLogin(true);
  //     setShowSignUp(false);
  //   }
  // const handleLoginClick = () => {
  //   setShowLogin(true);
  //   setShowSignUp(false); // Ensure only one form shows at a time
  // };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/WishlistHome">Wishlist</Link>
          <Link to="/GiftIdeas">Gift Ideas</Link>
          <Link to="/LoginForm">Log In</Link>
          <Link to="/SignUpForm">Sign up</Link>
        </nav>

        <Routes>
          <Route path="/WishlistHome" element={<WishlistHome />} />
          <Route path="/GiftIdeas" element={<GiftIdeas />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
