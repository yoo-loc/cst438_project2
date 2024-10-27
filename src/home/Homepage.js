import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Assuming you'll add some styles here

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Your effect logic here
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  const giftButton = () => {
    navigate('/GiftIdeas');
  };
  const handleGoToWishlist = () => {
    navigate('/PersonalWishlist');  // Navigate to the Wishlist page
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
    </div>
  );
};

export default HomePage;
