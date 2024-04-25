// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './MarketplacePage.css';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';
import ProcedureSearchBar from './ProcedureSearchBar/ProcedureSearchBar';

function MarketplacePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [zip, setZip] = useState('');
  const [searchDistance, setSearchDistance] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleZipSearch(event);
    }
  };

  const handleZipSearch = (event) => {
    event.preventDefault();
    if (zip.length !== 5 || isNaN(zip)) {
      alert('Please enter a valid 5-digit zip code.');

      setZip('');
      setSearchDistance('');
      return;
    }

    dispatch({
      type: 'SUBMIT_DISTANCE_DATA',
      payload: {
        zip,
        searchDistance,
      },
    });

    console.log(`Zip Code: ${zip} and searchDistance:${searchDistance}`);
    history.push('/results');
  };

  return (
    <>
      <NavBar />
      <h1>MyMedVita Marketplace</h1>
      <div className="container">
        <div className="input container">
          <form onSubmit={handleZipSearch}>
            <ProcedureSearchBar />

            <label htmlFor="zipSearch">Zip Code:</label>
            <input
              type="text"
              id="zipSearch"
              name="zipSearch"
              placeholder="Zip Code"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
            ></input>

            <label htmlFor="searchDistanceSearch">Distance (Miles):</label>
            <input
              type="number"
              id="searchDistanceSearch"
              name="searchDistanceSearch"
              placeholder="Distance (Miles)"
              value={searchDistance}
              onChange={(event) => setSearchDistance(event.target.value)}
              onKeyDown={handleKeyDown}
            ></input>
            <button type="submit">Shop</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MarketplacePage;
