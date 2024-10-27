import React, { useState, useEffect } from 'react';
import './Games.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Games = () => {
  const [selectedList, setSelectedList] = useState(''); 
  const [personalLists, setPersonalLists] = useState([]);
  const [games, setGames] = useState([]);          // For storing games fetched from API
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
  // Fetch games when component loads
  useEffect(() => {
    fetch('https://wishlistapi-b5777d959cf8.herokuapp.com/items/games')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setGames(data); // Store fetched games
      })
      .catch(error => {
        console.error('Error fetching games:', error);
        setError('Error fetching games');
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
      <h1>Games</h1>
      
      {/* Display error if any */}
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="games-list">
          {games.length > 0 ? (
            games.map(game => (
              <div key={game.id} className="game-item card">
                <img 
                  src={game.imageURL} 
                  alt={game.name} 
                  className="wishlist-item-image"
                  style={{ maxWidth: '150px', height: 'auto' }}  // Limit width to 150px and adjust height automatically
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}  // Fallback image
                />
                <div className="card-body">
                  <h3 className="card-title">{game.name}</h3>
                  <p className="card-text">{game.description}</p>
                  <p className="card-text">Price: ${game.price}</p>
                  <a href={game.url} target="_blank" rel="noopener noreferrer" className="btn btn-link">View Item</a>
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
                            handleAddToWishlist(game.id,selectedList)
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
            <p>No games available.</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Games;
