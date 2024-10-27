import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WishlistHome.css';
import Modal from 'react-modal';

const WishlistHome = () => {
  const [allitems, setAllItems] = useState([]);
  const [listitems, setListItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({ name: '', description: '', price: '', url: '', imageURL: '' });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [activeTab, setActiveTab] = useState('tab1');
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const listId = localStorage.getItem('selectedList');
    console.log('Personal Wishlist ID:', listId);
  }, []);

  // Fetch the items to display in modal tab1
  useEffect(() => {
    fetch('https://wishlistapi-b5777d959cf8.herokuapp.com/items')
      .then(response => response.json())
      .then(data => {
        setAllItems(data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);
  
  useEffect(() => {
    const listId = localStorage.getItem('selectedList');
    if (listId) {
      fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists/${listId}`)
        .then(response => response.json())
        .then(data => {
          setListItems(data);
        })
        .catch(error => {
          console.error('Error fetching items from wishlist:', error);
        });
    }
  }, []);

  const handleBackToHome = () => {
    navigate('/HomePage');
  };

  const handleDeleteItem = (itemId) => {
    const listId = localStorage.getItem('selectedList');
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items/lists/${listId}/remove-item/${itemId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setListItems(listitems.filter(item => item.id !== itemId));
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
        setAllItems(data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };

  const handleAddToWishlist = (itemId) => {
    const listId = localStorage.getItem('selectedList');
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
  const handleAddToDatabase = () => {
    fetch(`https://wishlistapi-b5777d959cf8.herokuapp.com/items?`, {
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

  // // Handle updating an item (Here you connect to the backend)
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
      const updatedItems = listitems.map(item =>
        item.id === itemId ? { ...item, ...data } : item
      );
      setListItems(updatedItems);
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

  return (
    <div className="wishlist-home-container">
      <h1>Random Items that you can add to your wishlist</h1>
      <div className="wishlist-header">
        <button onClick={handleBackToHome} className="btn btn-primary">Back to Homepage</button>
      </div>
      <button onClick={openModal} className="btn btn-info">Open Modal</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Modal Title</h2>
        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`} 
            onClick={() => handleTabSwitch('tab1')}>
              Search Items
            </button>
          <button 
            className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`} 
            onClick={() => handleTabSwitch('tab2')}
          >
            Can't find what you're looking for?
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'tab1' && (
            <div>
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search items..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch} className="btn btn-primary">Search</button>
            </div>
              {allitems.length > 0 ? (
                <div className="searched-items">
                  {allitems.map(item => (
                    <div key={item.id} className="all-item">
                      <img 
                        src={item.imageURL} 
                        alt={item.name} 
                        className="item-image"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}  // Fallback image
                      />
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Price: {item.price}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="view-item-link">View Item</a>
                      </div>
                      <div className="item-actions">
                        <button onClick={() => handleAddToWishlist(item.id)} className="btn btn-success">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No items found.</p>//THIS SHOULD NOT HAPPEN
              )}
            </div>
          )}
          {activeTab === 'tab2' && <div>Content for Tab 2</div>}
        </div>
        <p>Modal content goes here...</p>
        <button onClick={closeModal} className="btn btn-secondary">Close Modal</button>
      </Modal>
    
      {listitems.length > 0 ? (
        <ul>
          {listitems.map(item => (
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
        <p>Your Wishlist is empty.</p>
      )}
    </div>
  );
};


export default WishlistHome;
