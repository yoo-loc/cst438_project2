import React, { useState, useEffect } from 'react';
import './Gadgets.css'; // Import the CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Giftcard = () => {
  const [giftcards, giftCardItems] = useState([]); 
  const [error, setError] = useState(null);               // For error handling
  const navigate = useNavigate();                         // Initialize useNavigate hook for navigation

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

  // Function to handle deletion of an item
  const handleDeleteItem = (itemId) => {
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/${itemId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        giftCardItems(giftcards.filter(item => item.id !== itemId)); // Remove the deleted item
      } else {
        console.error('Failed to delete item');
      }
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
  };

  // Function to handle adding an item to the wishlist
  const handleAddToWishlist = (itemId) => {
    const listId = "6715b7f1affdde31c6318630";  // Your personal wishlist ID (use the correct one)
    
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
                    <button 
                      onClick={() => handleAddToWishlist(item.id)} 
                      className="btn btn-success"
                    >
                      Add to Wishlist
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)} 
                      className="btn btn-danger"
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No clothing items available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Giftcard;
