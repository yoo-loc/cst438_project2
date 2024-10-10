import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Assuming you'll add some styles here
import { useEffect, useState } from 'react';
import axios from 'axios';
//This file could be used to show all of a user's wishlists.
//Should consider deleting the logout button and implementing functionality to the logout button in the navbar.
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

  return (
    <div className="homePage">
      <h1>Welcome to your Wishlist</h1>
      <p>This is your homepage after logging in.</p>
      <div className="wishlists">
        {wishlists.length > 0 ? (
          <ul>
            {wishlists.map((wishlist, index) => (
              <li key={index}>{wishlist.name}</li>
            ))}
          </ul>
        ) : (
          <p>No wishlists available.</p>
        )}
      </div>
      <button onClick={handleLogout} className="btn btn-primary logout-btn">
        Logout
      </button>
    </div>
  );
};

export default HomePage;
