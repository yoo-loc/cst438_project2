import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Assuming you'll add some styles here
import { useEffect } from 'react';
import { useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleLogout = () => {
    localStorage.setItem("user", null);  // Clear the user from localStorage
    navigate('/login');
  };
  const giftButton = () => {
    navigate('/GiftIdeas');
  };
  const handleGoToWishlist = () => {
    navigate('/PersonalWishlist');  // Navigate to the Wishlist page
  };
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDeleteAccount = () => {
    alert('Deleting account');
    const rawUsername = localStorage.getItem('username');
    const username = rawUsername ? JSON.parse(rawUsername) : null;
    alert(password);
    alert(confirmPassword);
    if (password == confirmPassword) {
      // Add your delete account logic here
      fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/user/secure-delete?username=${username}&password=${password}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            navigate('/login');
          } else {
            alert('Failed to delete account');
            console.error("Failed to delete account.");
          }
        })
        .catch(error => {
          console.error("Error deleting account:", error);
        });
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="homePage">
      <h1>Welcome to your Wishlist</h1>
      <p>This is your homepage after logging in.</p>
      <br></br>

    
      <button onClick={giftButton} className="btn btn-primary gift-btn">
        Gifts
      </button>
      <button onClick={handleGoToWishlist} className="btn btn-primary wishlist-btn">
        Your Wishlist
      </button>
      <button onClick={handleLogout} className="btn btn-primary logout-btn">
        Logout
      </button>
      <button onClick={() => setShowDeleteConfirmation(true)} className="btn btn-danger delete-account-btn">
            Delete Account
          </button>
          {showDeleteConfirmation && (
            <div className="delete-confirmation">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={handleDeleteAccount} className="btn btn-danger confirm-delete-btn">
                Confirm Delete
              </button>
            </div>
          )}
    </div>
  );
};

export default HomePage;
