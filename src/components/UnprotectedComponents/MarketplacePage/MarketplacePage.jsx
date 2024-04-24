// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

function MarketplacePage() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      // Make a request to your backend API to fetch suggestions
      const response = await fetch(`/search?query=${query}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <>
      <NavBar />
      <h1>Marketplace Page</h1>
      <form>
        <p>Search:</p>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              {suggestion.primary_code} - {suggestion.description}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}

export default MarketplacePage;
