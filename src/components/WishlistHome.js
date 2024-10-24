import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const WishlistHome = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const [searchQuery, setSearchQuery] = useState('');  // Initialize searchQuery and setSearchQuery


  useEffect(() => {
    // Fetch items for the specific user or list
    fetch('http://localhost:8080/items?user=user456&list=1')  // Adjust as needed
      .then(response => response.json())
      .then(data => {
        setItems(data);  // Set the fetched items in state
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleBackToHome = () => {
    navigate('/HomePage');  // Navigate back to Homepage
  };
  const handleDeleteItem = (itemId) => {
    fetch(`http://localhost:8080/items/${itemId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Filter out the deleted item from the state
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
    // Call the search API with the search query
    fetch(`http://localhost:8080/items/search?search=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        setItems(data);  // Set the fetched search results in the state
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };



  return (
    <div>
      <h1>Your Wishlist</h1>
      <button onClick={handleBackToHome} className="btn btn-primary">Back to Homepage</button>  {/* Back button */}
      <input 
        type="text" 
        placeholder="Search items..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  // Update searchQuery on input change
      />
      <button onClick={handleSearch}>Search</button>  {/* Trigger search */}

      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">View Item</a>
              <br />
              {/* Add your delete logic here */}
              <button onClick={() => handleDeleteItem(item.id)} className="btn btn-danger">
                Delete Item
              </button>

            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default WishlistHome;
