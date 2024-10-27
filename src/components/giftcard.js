import React, { useState, useEffect } from 'react';
import './giftcard.css'; // Import the CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Giftcard = () => {
  const [selectedList, setSelectedList] = useState(''); 
  const [personalLists, setPersonalLists] = useState([]);
  const [giftcards, giftCardItems] = useState([]); 
  const [error, setError] = useState(null);               // For error handling
  const navigate = useNavigate();                         // Initialize useNavigate hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status
  useEffect(() => {
    const rawUserId = localStorage.getItem('user');
    const userId = rawUserId ? JSON.parse(rawUserId) : null;
    if(userId==null){
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  }, []);
  // Fetch clothing items when component loads
  useEffect(() => {
    fetch('https://wishlistapi-b5777d959cf8.herokuapp.com/items/giftcard')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        giftCardItems(data); // Store fetched gadget items
      })
      .catch(error => {
        console.error('Error fetching giftcard items:', error);
        setError('Error fetching giftcard items');
      });
  }, []);

  useEffect(() => {
    const rawUserId = localStorage.getItem('user');
    const userId = rawUserId ? JSON.parse(rawUserId) : null;
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists?userId=${userId}`)  // Adjust as needed
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);  // Log the fetched data for debugging
        if (Array.isArray(data)) {
          setPersonalLists(data);  // Set the wishlist items from the backend response
        } else {
          console.error("No items found in personal wishlist.");
        }
      })
      .catch(error => {
        console.error('Error fetching personal wishlist:', error);
      });
  }, []);

  // Function to handle adding an item to the wishlist
  const handleAddToWishlist = (itemId,listId) => {
    
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists/${listId}/add-existing-item?itemId=${itemId}`, {
      method: 'POST',
    })
    .then(response => {
        if (response.ok) {
            alert('Item added to your personal wishlist!');
            navigate('/PersonalWishlist');  // Navigate to the personal wishlist page after adding
        } else {
            alert('Failed to add item to wishlist');
        }
    })
    .catch(error => {
        console.error('Error adding item to wishlist:', error);
        alert('An error occurred while adding the item to the wishlist.');
    });
  };

  // Back button handler
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page using useNavigate
  };

  return (
    <div className="container">
      {/* Back button */}
      <button onClick={handleBackClick} className="btn btn-primary">Back to Homepage</button>
      <h1>Gift Cards</h1>
      
      {/* Display error if any */}
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="giftcard-list">
          {giftcards.length > 0 ? (
            giftcards.map(item => (
              <div key={item.id} className="giftcard-item card">
                <img 
                src={item.imageURL} 
                alt={item.name} 
                className="wishlist-item-image"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}  // Fallback image
              />
                <div className="card-body">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">Price: ${item.price}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-link">View Item</a>
                  <div className="button-group">
                  {isLoggedIn && (
                      <>
                        <select 
                          className="form-select" 
                          onChange={(e) => setSelectedList(e.target.value)}
                        >
                          <option value="">Select Wishlist</option>
                          {personalLists.map(list => (
                            <option key={list.id} value={list.id}>{list.name}</option>
                          ))}
                        </select>
                        <button 
                          className="btn btn-primary mt-2" 
                          onClick={() => {
                            if (!selectedList) {
                              return;
                            }
                            handleAddToWishlist(item.id,selectedList)
                            }}>
                          Add to Wishlist
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No giftcard items available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Giftcard;
