import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Assuming you'll add some styles here

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div className="homePage">
      <h1>Welcome to your Wishlist</h1>
      <p>This is your homepage after logging in.</p>
      
      <button onClick={handleLogout} className="btn btn-primary logout-btn">
        Logout
      </button>
    </div>
  );
};

export default HomePage;
