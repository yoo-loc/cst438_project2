import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WishlistHome.css';

const WishlistHome = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the items to display in Wishlist Home
  useEffect(() => {
    fetch('https://wishlistapi-b5777d959cf8.herokuapp.com/items')
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleBackToHome = () => {
    navigate('/HomePage');
  };

  const handleDeleteItem = (itemId) => {
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/${itemId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setItems(items.filter(item => item.id !== itemId));
      } else {
        console.error('Failed to delete item');
      }
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
  };

  const handleSearch = () => {
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/search?search=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };

  const handleAddToWishlist = (itemId) => {
    const listId = "6715b7f1affdde31c6318630";  // Your personal wishlist ID
    
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

  return (
    <div className="wishlist-home-container">
      <h1>Random Items that you can add to your wishlist</h1>
      <div className="wishlist-header">
        <button onClick={handleBackToHome} className="btn btn-primary">Back to Homepage</button>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search items..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>
      </div>
  
      {items.length > 0 ? (
        <div className="wishlist-items">
          {items.map(item => (
            <div key={item.id} className="wishlist-item">
              <img 
                src={item.imageURL} 
                alt={item.name} 
                className="wishlist-item-image"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}  // Fallback image
              />
              <div className="wishlist-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="view-item-link">View Item</a>
              </div>
              <div className="wishlist-item-actions">
                <button onClick={() => handleAddToWishlist(item.id)} className="btn btn-success">
                  Add to Wishlist
                </button>
                <button onClick={() => handleDeleteItem(item.id)} className="btn btn-danger">
                  Delete Item
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default WishlistHome;
