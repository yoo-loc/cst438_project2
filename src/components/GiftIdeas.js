import React from 'react';

const GiftIdeas = () => {
    const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/items/lists');
        setWishlists(response.ok);
      } catch (error) {
        console.error('Error fetching wishlists:', error);
      }
    };

    fetchWishlists();
  }, []);

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