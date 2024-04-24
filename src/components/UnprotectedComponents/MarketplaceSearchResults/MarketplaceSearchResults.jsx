import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './MarketplaceSearchResults.css';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

export default function MarketplaceSearchResults() {
  const history = useHistory();
  const [zip, setZip] = useState('');
  const [distance, setDistance] = useState('');
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [originalZip, setOriginalZip] = useState('');
  const [originalDistance, setOriginalDistance] = useState('');

  const centerLat = 36.1539;
  const centerLon = -95.9927;

  const points = [
    [36.1539, -95.9927],
    [33.6609, -95.5555],
    [35.9334, -95.8776],
  ];

  const handleZipSearch = (event) => {
    event.preventDefault();
    if (zip.length !== 5 || isNaN(zip)) {
      alert('Please enter a valid 5-digit zip code.');

      setZip('');
      setDistance('');
      return;
    }

    console.log(`Zip Code: ${zip} and Distance:${distance}`);
    const maxDistance = parseFloat(distance); // Maximum distance in miles
    const filteredPoints = filterPoints(
      centerLat,
      centerLon,
      points,
      maxDistance
    );
    setFilteredPoints(filteredPoints);

    setOriginalZip(zip);
    setOriginalDistance(distance);

    setZip('');
    setDistance('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleZipSearch(event);
    }
  };

  function haversine(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function filterPoints(centerLat, centerLon, points, maxDistance) {
    const filteredPoints = points.filter((point) => {
      const distance = haversine(centerLat, centerLon, point[0], point[1]);
      return distance <= maxDistance;
    });
    return filteredPoints;
  }

  const handleBack = () => {
    history.push('/search');
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="input container">
          <form onSubmit={handleZipSearch}>
            <label htmlFor="zipSearch">Zip Code:</label>
            <input
              type="text"
              id="zipSearch"
              name="zipSearch"
              placeholder="Zip Code"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              onKeyDown={handleKeyDown}
            ></input>

            <label htmlFor="distanceSearch">Distance(Miles):</label>
            <input
              type="number"
              id="distanceSearch"
              name="distanceSearch"
              placeholder="Distance(Miles)"
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="result-container">
          <h1>MyMedVita Search Results</h1>
          <h4>
            Search Parameters: MRI - , Zip: {originalZip}, {originalDistance}{' '}
            Miles
          </h4>

          <p>
            NOTE: setting zip 74011 as center on map. (This is hardcoded for
            now). Test markers are: [36.1539, -95.9927] and [33.6609, -95.5555]
            within 30 miles. Test marker [33.6609, -95.5555 ] is within 200
            miles.
          </p>
          <h2>Filtered Data</h2>
          <table className="centered-table">
            <thead>
              <tr>
                <th>Coordinate</th>
                <th>Distance (miles)</th>
              </tr>
            </thead>
            <tbody>
              {filteredPoints.map((point, index) => (
                <tr key={index}>
                  <td>{point.join(', ')}</td>
                  <td>
                    {haversine(
                      centerLat,
                      centerLon,
                      point[0],
                      point[1]
                    ).toFixed(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleBack}>Back</button>
        </div>
        <div className="map-container">
          <MapContainer
            className="map"
            center={[centerLat, centerLon]}
            zoom={6}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredPoints.map((point, index) => (
              <Marker key={index} position={point}></Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
}
