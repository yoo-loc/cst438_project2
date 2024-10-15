import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import GiftAdd from './WishlistHome';


const GiftAdd = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();  // Initialize the useNavigate hook
    const [searchQuery, setSearchQuery] = useState('');  // Initialize searchQuery and setSearchQuery

    
const handleBackToHome = () => {
    navigate('/HomePage');  // Navigate back to Homepage
  };


<button onClick={handleBackToHome} className="btn btn-primary">Back to Homepage</button>


};
export default GiftAdd;