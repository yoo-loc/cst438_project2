import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import './Giftideas.css';  // Assuming you'll add some styles here
import bookImage from '../images/book.png';
import gadgetsImage from '../images/gadgets.png';
import clothingImage from '../images/clothing.png';
import giftCardImage from '../images/giftcard.png';
import craftImage from '../images/crafts.png';
import { Link } from 'react-router-dom';




const GiftIdeas = () => {
    const ideas = [
        {title: 'Books',image: bookImage,path: '/giftList'},
        {title: 'Gadgets',image: gadgetsImage,path: '/giftList'},
        {title: 'Clothing',image: clothingImage,path: '/giftList'},
        {title: 'Gift Cards',image: giftCardImage,path: '/giftList'},
        {title: 'Handmade Crafts',image: craftImage,path: '/giftList'},  
        
    ];

    return (
        <div>
            <h1>Gift Ideas</h1>
            <ul>
                <div className='giftIdeas'>
                {ideas.map((idea, index) => (
                    <li key={index}>
                        
                        <a href={idea.url} target="_blank" rel="noopener noreferrer">
                        <img src={idea.image} alt={idea.title} style={{ width: '150px', height: 'auto', margin: '5px' }} />
                        <h3>{idea.title}</h3>
                        {/* Add a button to view the idea */}
                    
                        </a>
    
                    </li>
                ))}
                </div>
            </ul>
            
        </div>
    );
};

export default GiftIdeas;