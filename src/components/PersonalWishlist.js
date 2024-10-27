import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalWishlist.css';  // Import your custom CSS

const PersonalWishlist = () => {
  const [personalLists, setPersonalLists] = useState([]);
  const [editingList, setEditingList] = useState(null);  // For tracking the item being edited
  const [updatedList, setUpdatedList] = useState({ name: ''});
  const navigate = useNavigate();

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

  const handleDeleteWishlist = (wishlistId) => {
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists/${wishlistId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedItems = personalLists.filter(lists => lists.id !== wishlistId);
          setPersonalLists(updatedItems);  // Update the UI
        } else {
          console.error("Failed to delete item from wishlist.");
        }
      })
      .catch(error => {
        console.error("Error deleting item:", error);
      });
  };

  const handleAddList = (data) => {
    const rawUserId = localStorage.getItem('user');
    const userId = rawUserId ? JSON.parse(rawUserId) : null;
    alert(`Adding list: ${userId}`);
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists?userId=${userId}&name=${data.name}&isPublic=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.message || 'Failed to create list'); });
        }
        return response.json();
      })
      .then(data => {
        setPersonalLists([...personalLists, data]);
        alert('List added successfully!');
      })
      .catch(error => {
        console.error('Error adding list:', error);
        alert(`An error occurred while adding the list: ${error.message}`);
      });
  };

  const handleUpdateList = (lists) => {
    const params = new URLSearchParams();
    if (updatedList.name) {
      params.append('name', updatedList.name);
    }
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists/${lists.id}?${params.toString()}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',  // Make sure the content type is set correctly
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.message || 'Failed to update list'); });
        }
        return response.json();
      })
      .then((data) => {
        alert('List updated successfully!');
        // Update the UI state with the updated item
        const updatedItems = personalLists.map(list =>
          list.id === lists.id ? { ...list, ...data } : list
        );
        setPersonalLists(updatedItems);
        setEditingList(null);  // Exit editing mode
      })
      .catch((error) => {
        console.error('Error updating item:', error);
        alert(`An error occurred while updating the item: ${error.message}`);
      });
  };

  // Handle editing an item
  const handleEditList = (lists) => {
    setEditingList(lists.id);
    setUpdatedList({ 
      name: lists.name
    });
  };

  // Handle input changes in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedList(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleBackToHome = () => {
    navigate('/Homepage');
  };

  return (
    <div className="container">
      <h1>Your Personal Wishlist</h1>
      <button onClick={handleBackToHome} className="btn btn-primary">Back to Home Page</button>
      <div className="add-form">
        <input
          type="text"
          name="name"
          placeholder="Enter List Name"
          onChange={(e) => setUpdatedList({ name: e.target.value })}
        />
        <button onClick={() => handleAddList(updatedList)} className="btn btn-success">
          Add Wishlist  
        </button>
      </div>
      {personalLists.length > 0 ? (
        <ul>
          {personalLists.map(lists => (
            <li key={lists.id}>
              {editingList === lists.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="name"
                    value={updatedList.name}
                    onChange={handleInputChange}
                    placeholder="List Name"
                  />
                  <button onClick={() => handleUpdateList(lists)} className="btn btn-success">
                    Update Wishlist
                  </button>
                </div>
              ) : (
                <div className="item-details">
                  <div>
                    <h3>{lists.name}</h3>
                  </div>
                  <div className="item-actions">
                  <button onClick={() => {
                    localStorage.setItem('selectedList', JSON.stringify(lists.id));
                    navigate('/wishlistHome');
                  }} className="btn btn-secondary">
                    View List
                  </button>
                    <button onClick={() => handleEditList(lists)} className="btn btn-info">
                      Edit List  
                    </button>
                    <button onClick={() => handleDeleteWishlist(lists.id)} className="btn btn-danger">
                      Delete List
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your personal wishlist is empty.</p>
      )}
    </div>
  );
};

export default PersonalWishlist;