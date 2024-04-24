import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './MarketplaceSearchResults.css';

import NavBar from '../../AccessoryComponents/Nav/Nav';

export default function MarketplaceSearchResults() {
  const history = useHistory();

  const centerLat = 36.1539;
  const centerLon = -95.9927;

  const points = [
    [36.1539, -95.9927],
    [33.6609, -95.5555],
    [35.9334, -95.8776],
  ];

  const maxDistance = 150; // Maximum distance in miles

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

  const filteredPoints = filterPoints(
    centerLat,
    centerLon,
    points,
    maxDistance
  );

  const distances = filteredPoints.map((point) =>
    haversine(centerLat, centerLon, point[0], point[1])
  );

  const handleBack = () => {
    history.push('/search');
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="result-container">
          <h1>MyMedVita Search Results</h1>
          <h4>Search Parameters: MRI - , 74011, No limit on Miles</h4>

          <p>
            NOTE: setting zip as center on map. Test markers are: [36.1539,
            -95.9927] and [33.6609, -95.5555]
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
                  <td>{distances[index].toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="unfiltered-data">
            <h2>All Data</h2>
            <table className="centered-table">
              <thead>
                <tr>
                  <th>Coordinate</th>
                </tr>
              </thead>
              <tbody>
                {points.map((point, index) => (
                  <tr key={index}>
                    <td>{point.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
