import React from 'react';

const GiftIdeas = () => {
    const ideas = [
        'Books',
        'Gadgets',
        'Clothing',
        'Gift Cards',
        'Handmade Crafts'
    ];

    return (
        <div>
            <h1>Gift Ideas</h1>
            <ul>
                {ideas.map((idea, index) => (
                    <li key={index}>{idea}</li>
                ))}
            </ul>
        </div>
    );
};

export default GiftIdeas;