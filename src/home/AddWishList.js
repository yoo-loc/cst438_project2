import React, { useState } from 'react';

const AddWishlist = ({ onSave }) => {
  const [wishListName, setWishListName] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = () => {
    const newWishlist = {
      name: wishListName,
      public: isPublic,
    };
    onSave(newWishlist);
  };

  return (
    <div>
      <h2>Create Wish List</h2>
      <input 
        type="text" 
        placeholder="Wish List Name" 
        value={wishListName} 
        onChange={(e) => setWishListName(e.target.value)} 
      />
      <label>
        <input 
          type="radio" 
          value={true} 
          checked={isPublic} 
          onChange={() => setIsPublic(true)} 
        />
        Public
      </label>
      <label>
        <input 
          type="radio" 
          value={false} 
          checked={!isPublic} 
          onChange={() => setIsPublic(false)} 
        />
        Private
      </label>
      <button onClick={handleSubmit}>Create Wish List</button>
    </div>
  );
};

export default AddWishlist;
