import React, { useState } from 'react';
import './App.css'; // Import the CSS
import SignUpForm from './components/SignUpForm'; // Ensure these are imported
import LoginForm from './components/LoginForm';
import WishlistHome from "./components/WishlistHome";
import GiftIdeas from "./components/GiftIdeas";
import  { BrowserRouter as Router, Route, Switch, Link, Routes} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link className="nav-link" to="/WishlistHome">Wishlist</Link>
          <Link className="nav-link" to="/GiftIdeas">Gift Ideas</Link>
          <Link className="nav-link" to="/LoginForm">Log In</Link>
          <Link className="nav-link" to="/SignUpForm">Sign up</Link>
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
