import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Assuming you'll add some styles here
import GiftIdeas from '../components/GiftIdeas';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await axios.get('https://wishlistapi-b5777d959cf8.herokuapp.com/api/items/lists');
        setWishlists(response.ok);
      } catch (error) {
        console.error('Error fetching wishlists:', error);
      }
    };

    fetchWishlists();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };
  const wishlistButton = () => {
    navigate('/WishlistHome');
  };
  const giftButton = () => {
    navigate('/GiftIdeas');
  };
  const handleGoToWishlist = () => {
    navigate('/WishlistHome');  // Navigate to the Wishlist page
  };


  return (
    <div className="homePage">
      <h1>Welcome to your Wishlist</h1>
      <p>This is your homepage after logging in.</p>
      <br></br>

      <button onClick={wishlistButton} className="btn btn-primary logout-btn">
        Wishlist
      </button>
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
