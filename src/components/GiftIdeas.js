import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

import './Giftideas.css';  // Assuming you'll add some styles here
import bookImage from '../images/book.png';
import gadgetsImage from '../images/gadgets.png';
import clothingImage from '../images/clothing.png';
import giftCardImage from '../images/giftcard.png';
import craftImage from '../images/crafts.png';
import videoGamesImage from '../images/video-games.png';

const GiftIdeas = () => {
    const navigate = useNavigate();  // Initialize useNavigate

    const ideas = [

        {
            title: 'Books',
            image: bookImage,
            url: 'https://www.amazon.com/books',  // Example URL for books
        },
        {
            title: 'Gadgets',
            image: gadgetsImage,
            url: 'https://www.bestbuy.com/site/shop/useful-gadgets',  // Example URL for gadgets
        },
        {
            title: 'Clothing',
            image: clothingImage,
            url: 'https://www.amazon.com/clothing',  // Example URL for clothing
        },
        {
            title: 'Gift Cards',
            image: giftCardImage,
            url: 'https://www.amazon.com/giftcards',  // Example URL for gift cards
        },
        {
            title: 'Handmade Crafts',
            image: craftImage,
            url: 'https://www.pinterest.com/liberalsprinkles/diy-handmade-crafts/',  // Example URL for crafts
        },

        {
            title: 'Top Video Games (2023)',
            image: videoGamesImage,  // Add image for video games
            route: '/videogames',  // Route for video games category
        }

    ];

    // Function to handle adding a gift idea to the personal wishlist
    const addToWishlist = (idea) => {
        const personalWishlist = JSON.parse(localStorage.getItem('personalWishlist')) || [];
        const updatedWishlist = [...personalWishlist, idea];  // Add the selected gift idea
        localStorage.setItem('personalWishlist', JSON.stringify(updatedWishlist));
        alert(`${idea.title} has been added to your personal wishlist!`);
        navigate('/PersonalWishlist');  // Navigate to personal wishlist page
    };

    const handleBack = () => {
        navigate(-1);  // This will navigate back to the previous page
    };

    return (
        <div>
            <h1>Gift Ideas</h1>
            <button onClick={handleBack} className="btn btn-primary" style={{ marginBottom: '20px' }}>
                Back
            </button>
            <ul className="giftIdeas">
                {ideas.map((idea, index) => (
                    <li key={index}>

                        
                        <a href={idea.url} target="_blank" rel="noopener noreferrer">
                        <img src={idea.image} alt={idea.title} style={{ width: '150px', height: 'auto', margin: '5px' }} />
                        <h3>{idea.title}</h3>
                        {/* Add a button to view the idea */}
                    
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GiftIdeas;
