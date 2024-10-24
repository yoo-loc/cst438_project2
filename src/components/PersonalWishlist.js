import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalWishlist.css';  // Import your custom CSS

const PersonalWishlist = () => {
  const [personalItems, setPersonalItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);  // For tracking the item being edited
  const [updatedItem, setUpdatedItem] = useState({ name: '', description: '', price: '', url: '', imageURL: '' });
  const navigate = useNavigate();
  const listId = "66fe3f8cd7b57e308cdea645";  // Your personal wishlist ID

  // Fetch the personal wishlist from the backend when the component mounts
  useEffect(() => {
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists?listId=${listId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        return response.json();
      })
      .then(data => {
        if (data.items) {
          setPersonalItems(data.items);  // Set the wishlist items from the backend response
        } else {
          console.error("No items found in personal wishlist.");
        }
      })
      .catch(error => {
        console.error('Error fetching personal wishlist:', error);
      });
  }, [listId]);

  // Handle deleting an item from the personal wishlist via backend
  const handleDeleteItem = (itemId) => {
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists/${listId}/remove-item/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedItems = personalItems.filter(item => item.id !== itemId);
          setPersonalItems(updatedItems);  // Update the UI
        } else {
          console.error("Failed to delete item from wishlist.");
        }
      })
      .catch(error => {
        console.error("Error deleting item:", error);
      });
  };

  // Handle editing an item
  const handleEditItem = (item) => {
    setEditingItem(item.id);
    setUpdatedItem({ 
      name: item.name, 
      description: item.description, 
      price: item.price, 
      url: item.url, 
      imageURL: item.imageURL 
    });
  };

  // Handle updating an item (Here you connect to the backend)
  const handleUpdateItem = (itemId) => {
    // Log the data you're about to send for debugging
    console.log("Updated item data:", updatedItem);

    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',  // Make sure the content type is set correctly
      },
      body: JSON.stringify({
        name: updatedItem.name,
        description: updatedItem.description,
        price: parseFloat(updatedItem.price),  // Ensure the correct data type is sent
        url: updatedItem.url,
        imageURL: updatedItem.imageURL,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.message || 'Failed to update item'); });
      }
      return response.json();
    })
    .then((data) => {
      alert('Item updated successfully!');
      // Update the UI state with the updated item
      const updatedItems = personalItems.map(item =>
        item.id === itemId ? { ...item, ...data } : item
      );
      setPersonalItems(updatedItems);
      setEditingItem(null);  // Exit editing mode
    })
    .catch((error) => {
      console.error('Error updating item:', error);
      alert(`An error occurred while updating the item: ${error.message}`);
    });
  };

  // Handle input changes in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleBackToWishlistHome = () => {
    navigate('/WishlistHome');
  };

  const handleBackToHome = () => {
    navigate('/Homepage');
  };

  return (
    <div className="container">
      <h1>Your Personal Wishlist</h1>
      <button onClick={handleBackToWishlistHome} className="btn btn-primary">Add an item</button>
      <button onClick={handleBackToHome} className="btn btn-primary">Back to Home Page</button>


      {personalItems.length > 0 ? (
        <ul>
          {personalItems.map(item => (
            <li key={item.id}>
              {editingItem === item.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="name"
                    value={updatedItem.name}
                    onChange={handleInputChange}
                    placeholder="Item Name"
                  />
                  <input
                    type="text"
                    name="description"
                    value={updatedItem.description}
                    onChange={handleInputChange}
                    placeholder="Item Description"
                  />
                  <input
                    type="number"
                    name="price"
                    value={updatedItem.price}
                    onChange={handleInputChange}
                    placeholder="Item Price"
                  />
                  <input
                    type="text"
                    name="url"
                    value={updatedItem.url}
                    onChange={handleInputChange}
                    placeholder="Item URL"
                  />
                  <input
                    type="text"
                    name="imageURL"   // Ensure this matches what you're setting
                    value={updatedItem.imageURL}
                    onChange={handleInputChange}
                    placeholder="Item Image URL"
                  />
                  <button onClick={() => handleUpdateItem(item.id)} className="btn btn-success">
                    Update Item
                  </button>
                </div>
              ) : (
                <div className="item-details">
                  <img 
                    src={item.imageURL} 
                    alt={item.name} 
                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'} 
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">View Item</a>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEditItem(item)} className="btn btn-info">
                      Edit Item
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="btn btn-danger">
                      Delete Item
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
