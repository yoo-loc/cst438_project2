import React, { useState, useEffect } from 'react';
import './Books.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Books = () => {
  const [books, setBooks] = useState([]);          // For storing books fetched from API
  const [error, setError] = useState(null);        // For error handling
  const navigate = useNavigate();                  // Initialize useNavigate hook for navigation
  // For storing search results

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

  // Function to handle deletion of an item
  const handleDeleteItem = (itemId) => {
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/${itemId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setBooks(books.filter(book => book.id !== itemId));  // Filter out deleted item
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
                    <button 
                      onClick={() => handleAddToWishlist(book.id)} 
                      className="btn btn-success"
                    >
                      Add to Wishlist
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(book.id)} 
                      className="btn btn-danger"
                    >
                      Delete Item
                    </button>
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
