import React, { useState, useEffect } from 'react';
import './Books.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { set } from 'mongoose';

const Books = () => {
  const [personalLists, setPersonalLists] = useState([]);
  const [books, setBooks] = useState([]);          // For storing books fetched from API
  const [error, setError] = useState(null);        // For error handling
  const navigate = useNavigate();                  // Initialize useNavigate hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status
  useEffect(() => {
    const rawUserId = localStorage.getItem('user');
    const userId = rawUserId ? JSON.parse(rawUserId) : null;
    if(userId==null){
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  }, []);
  // Fetch books when component loads
  useEffect(() => {
    fetch('https://wishlistapi-b5777d959cf8.herokuapp.com/items/books')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBooks(data); // Store fetched books
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setError('Error fetching books');
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

   // State to track login status

  // Check login status when component loads
  return (
    <div className="container">
      {/* Back button */}
      <button onClick={handleBackClick} className="btn btn-primary">Back to Homepage</button>
      <h1>Books</h1>
      
      {/* Display error if any */}
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="books-list">
          {books.length > 0 ? (
            books.map(book => (
              <div key={book.id} className="book-item card">
                <img 
                  src={book.imageURL} 
                  alt={book.name} 
                  className="wishlist-item-image"
                  style={{ maxWidth: '150px', height: 'auto' }}  // Limit width to 150px and adjust height automatically
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}  // Fallback image
                />
                <div className="card-body">
                  <h3 className="card-title">{book.name}</h3>
                  <p className="card-text">{book.description}</p>
                  <p className="card-text">Price: ${book.price}</p>
                  <a href={book.url} target="_blank" rel="noopener noreferrer" className="btn btn-link">View Item</a>
                  <div className="button-group">
                    {isLoggedIn && (<select className="form-select">
                        <option value="">Select Wishlist</option>
                        {personalLists.map(list => (
                          <option key={list.id} value={list.id}>{list.name}</option>
                        ))}
                      </select>)}
                    {isLoggedIn && (
                      <button 
                        onClick={() => handleAddToWishlist(book.id)} 
                        className="btn btn-success"
                      >
                        Add to Wishlist
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Books;
