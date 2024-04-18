import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
//to import react-leflet use npm install react-leaflet

import 'leaflet/dist/leaflet.css';
import './SearchResults.css';

export default function SearchResults() {
  const [zip, setZip] = useState('');

  const markers = [
    { geocode: [32.7767, -96.797] },
    { geocode: [33.6609, -95.5555] },
  ];

  const handleZipSearch = (event) => {
    event.preventDefault();
    console.log(`Zip Code: ${zip}`);
    setZip('');
  };

  return (
    <>
      <p>Search Result Page</p>
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
          ></input>
          <button>Submit</button>
        </form>
      </div>
      <div className="container">
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
    </>
  );
}
