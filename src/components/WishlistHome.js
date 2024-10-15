import React, { useState, useEffect } from 'react';

const WishlistHome = () => {
  const [items, setItems] = useState([]);

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
  const handleGiftAdd = () => {
    navigate('/giftAdd');  // Navigate back to Homepage
  };
  const handleDeleteItem = (itemId) => {
    fetch(`http://localhost:8080/items/${itemId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // Remove the deleted item from the state
            setItems(items.filter(item => item.id !== itemId));
            console.log('Item deleted successfully');
        } else {
            console.error('Failed to delete item');
        }
    })
    .catch(error => {
        console.error('Error during item deletion:', error);
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
      <button onClick={handleGiftAdd} className="btn btn-primary">Add an Item</button>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">View Item</a>
              <br />
              <button onClick={() => handleDelete(item.id)} className="btn btn-danger">
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
