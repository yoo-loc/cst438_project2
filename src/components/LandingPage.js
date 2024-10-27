//import react from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
const LandingPage = () => {
  // The links to the signup and login pages should send an alert to user they're already logged in and redirect them to the WishlistHome page.
  const navigate = useNavigate();
  const toLogin = () => {
    navigate('/Login');
  };

  const handleLinkClick = (e) => {
    const rawUserId = localStorage.getItem('user');
    const isLoggedIn = rawUserId ? JSON.parse(rawUserId) : null;
    if (isLoggedIn!=null) {
      e.preventDefault();
      navigate('/Homepage');
    }
  };
  return (
    <div className="app-home">
      <div className='mainContent'>
        <h1>Welcome to our Wishlist</h1>
        <h1>Convenient. Simple. Personalized. </h1>
        <h3>If you no longer want to deal with paper lists, then there are plenty of other options. Why not another? Why not ours?</h3>
        <p>Here you can create a wishlist and share it with your friends and family. Like any wishlist should.</p>
        <p>Need some gift ideas? Check out our <Link to="/GiftIdeas" className="link">Gift Ideas</Link> page.</p>
        <p></p>
        <p>To get started, create your account <Link to="/Signup" className="link" onClick={(e) => handleLinkClick(e)}>here</Link></p>
        <p>Already a loyal customer? Login <Link to="/Login" className="link" onClick={(e) => handleLinkClick(e)}>here</Link>.</p>

        <button onClick={toLogin} className="getStartedbtn">Get Started</button>
      </div>
    </div>
  );
}
export default LandingPage;