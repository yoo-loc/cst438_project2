import React, { useState, useEffect } from 'react';

const WishlistView = () => {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    // Fetch items for the specific user or list
    fetch('https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists?userId=12345')  // Adjust as needed
      .then(response => response.json())
      .then(data => {
        setWishlists(data);  // Set the fetched wishlists in state
      })
      .catch(error => {
        console.error('Error fetching wishlists:', error);
      });
  }, []);
  
  const handleDelete = (wishlistId) => {
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists?${wishlistId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted wishlist from the state
          setWishlists(wishlists.filter(wishlist => wishlist.id !== wishlistId));
          console.log('Wishlist deleted successfully');
        } else {
          console.error('Failed to delete wishlist');
        }
      })
      .catch(error => {
        console.error('Error during wishlist deletion:', error);
      });
  };
  const handleAddWishlist = () => {
    fetch('https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'New Wishlist' }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to add wishlist');
        }
      })
      .then(data => {
        setWishlists([...wishlists, data]);
        console.log('Wishlist added successfully');
      })
      .catch(error => {
        console.error('Error during wishlist addition:', error);
      });
  }
  
  return (
    <div>
      <h1>Wishlists</h1>
      <button onClick={handleAddWishlist}>Add Wishlist</button>
      <br />
      <ul>
        {wishlists.map(wishlist => (
          <li key={wishlist.id}>
            {wishlist.name}
            <button onClick={() => handleDelete(wishlist.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
  };
  
  export default WishlistView;
  