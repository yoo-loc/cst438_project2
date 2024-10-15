import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Assuming you'll add some styles here
import GiftIdeas from '../components/GiftIdeas';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };
  const giftButton = () => {
    navigate('/GiftIdeas');
  };
  

  return (
    <div className="homePage">
      <h1>Welcome to your Wishlist</h1>
      <p>This is your homepage after logging in.</p>
      <br></br>

    
      <button onClick={giftButton} className="btn btn-primary logout-btn">
        Gifts
      </button>
      <button onClick={handleLogout} className="btn btn-primary logout-btn">
        Logout
      </button>
    </div>
  );
};

export default HomePage;
