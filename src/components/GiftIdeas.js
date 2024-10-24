import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import Link for internal navigation

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
            route: '/books',  // Route for books category
        },
        {
            title: 'Gadgets',
            image: gadgetsImage,
            route: '/gadgets',  // Route for gadgets category
        },
        {
            title: 'Clothing',
            image: clothingImage,
            route: '/clothing',  // Route for clothing category
        },
        {
            title: 'Gift Cards',
            image: giftCardImage,
            route: '/giftcards',  // Route for gift cards category
        },
        {
            title: 'Handmade Crafts',
            image: craftImage,
            route: '/handmadecrafts',  // Route for handmade crafts category
        },
        {
            title: 'Top Video Games (2023)',
            image: videoGamesImage,
            route: '/videogames',  // Route for video games category
        }
    ];

    // Function to shuffle the array
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

// Use the shuffleArray function
const randomizedGiftIdeas = shuffleArray(ideas);

// Display the shuffled array
console.log(randomizedGiftIdeas);

    const handleBack = () => {
        navigate(-1);  // This will navigate back to the previous page
    };

    return (
        <div className="container">
            <h1>Gift Ideas</h1>
            <button onClick={handleBack} className="btn btn-primary" style={{ marginBottom: '20px', marginLeft: '30px' }}>
                Back
            </button>
            <ul className="giftIdeas">
                {ideas.map((idea, index) => (
                    <li key={index}>
                        <Link to={idea.route}>
                            <img src={idea.image} alt={idea.title} style={{ width: '150px', height: 'auto', margin: '5px' }} />
                            <h3>{idea.title}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GiftIdeas;
