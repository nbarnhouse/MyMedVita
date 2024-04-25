// Import 3rd Party Libraries
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './MarketplaceSearchResults.css';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

export default function MarketplaceSearchResults() {
  const history = useHistory();
  const data = useSelector((state) => state.distance);

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

  useEffect(() => {
    const maxDistance = parseFloat(data.searchDistance); // Maximum distance in miles
    const filteredPoints = filterPoints(
      centerLat,
      centerLon,
      points,
      maxDistance
    );
    setFilteredPoints(filteredPoints);
    setOriginalZip(data.zip);
    setOriginalDistance(data.searchDistance);
  }, []);

  const handleBack = () => {
    history.push('/marketplace');
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

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="result-container">
          <h1>MyMedVita Search Results</h1>
          <h4>
            Search Parameters: [CODE HERE] , {originalZip}, {originalDistance}{' '}
            Miles
          </h4>
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
        <table className="centered-table">
          <thead>
            <tr>
              <th>
                <h2>Provider</h2>
              </th>
              <th>
                <h2>Price</h2>
              </th>
              <th>
                <h2>Distance</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPoints.map((point, index) => (
              <tr key={index}>
                <td>[Provider Name Here]</td>

                <td>[Provider Price Here]</td>

                <td>
                  {/* Calculate distance using haversine formula */}
                  {haversine(centerLat, centerLon, point[0], point[1]).toFixed(
                    0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleBack}>Back</button>
      </div>
    </>
  );
}
