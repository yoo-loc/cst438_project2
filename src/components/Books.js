import React, { useState, useEffect } from 'react';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://wishlistapi-b5777d959cf8.herokuapp.com/items/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="container">
      <h1>Books</h1>
      <div className="books-list">
        {books.length > 0 ? (
          books.map(book => (
            <div key={book.id} className="book-item">
              <img src={book.imageURL} alt={book.name} />
              <h3>{book.name}</h3>
              <p>{book.description}</p>
              <p>Price: ${book.price}</p>
              <a href={book.url} target="_blank" rel="noopener noreferrer">View Item</a>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default Books;
