import React from 'react';
import './Giftideas.css'; // Assuming you'll add some styles here
import bookImage from '../images/book.png';
import gadgetsImage from '../images/gadgets.png';
import clothingImage from '../images/clothing.png';
import giftCardImage from '../images/giftcard.png';
import craftImage from '../images/crafts.png';




const GiftIdeas = () => {
    const ideas = [
        {title: 'Books',image: bookImage,},
        {title: 'Gadgets',image: gadgetsImage,},
        {title: 'Clothing',image: clothingImage,},
        {title: 'Gift Cards',image: giftCardImage,},
        {title: 'Handmade Crafts',image: craftImage,},  
    ];

    return (
        <div>
            <h1>Gift Ideas</h1>
            <ul>
                <div className='giftIdeas'>
                {ideas.map((idea, index) => (
                    <li key={index}>
                    <img src={idea.image} alt='' style={{ width: '150px', height: 'auto', margin: '5px' }} />
                    <h3>{idea.title}</h3>
                    </li>
                ))}
                </div>
            </ul>
            
        </div>
    );
};

export default GiftIdeas;