// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
//to import react-leflet use npm install react-leaflet

import 'leaflet/dist/leaflet.css';
import './MarketplaceSearchResults.css';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

export default function MarketplaceSearchResults() {
  const history = useHistory();

  const markers = [
    { geocode: [36.1539, -95.9927] },
    { geocode: [33.6609, -95.5555] },
  ];

  const handleBack = () => {
    history.push('/search');
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="result-container">
          <h1>MyMedVita Search Results</h1>
          <h4>Search Parameters: MRI - , 74011, 150 Miles</h4>

          <p>
            NOTE: setting zip as center on map. Test markers are: [36.1539,
            -95.9927] and [33.6609, -95.5555]
          </p>
          <h4>Provider Price Distance</h4>
          <p>Data Here</p>

          <button onClick={handleBack}>Back</button>
        </div>
        <div className="map-container">
          <MapContainer className="map" center={[36.1539, -95.9927]} zoom={6}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker) => (
              <Marker key={marker.index} position={marker.geocode}></Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
}
