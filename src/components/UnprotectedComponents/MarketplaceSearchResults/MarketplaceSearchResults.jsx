import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios'; 

import 'leaflet/dist/leaflet.css';
import './MarketplaceSearchResults.css';

import NavBar from '../../AccessoryComponents/Nav/Nav';

export default function MarketplaceSearchResults() {
  const history = useHistory();
  const { procedureCode, zip, distance, providers } = useSelector((state) => state.distance);

  const centerLat = 36.1539;
  const centerLon = -95.9927;

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

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="result-container">
          <h1>MyMedVita Search Results</h1>
          <h4>
            Search Parameters: CPT Code: {procedureCode}, Zip: {zip}, within {distance} Miles
          </h4>
        </div>
        <div className="map-container">
          <MapContainer className="map" center={[centerLat, centerLon]} zoom={6}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {providers.map((provider, index) => {
              // Ensure provider latitude and longitude are defined before rendering the marker
              if (provider.provider_lat && provider.provider_long) {
                const providerLat = parseFloat(provider.provider_lat);
                const providerLon = parseFloat(provider.provider_long);
                const providerDistance = haversine(centerLat, centerLon, providerLat, providerLon);
                return (
                  <Marker key={index} position={[providerLat, providerLon]}>
                    <Popup>{provider.provider_last_name}, {provider.provider_first_name}</Popup>
                  </Marker>
                );
              }
              return null;
            })}
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
            {providers.map((provider, index) => {
              if (provider.provider_lat && provider.provider_long) {
                const providerLat = parseFloat(provider.provider_lat);
                const providerLon = parseFloat(provider.provider_long);
                const providerDistance = haversine(centerLat, centerLon, providerLat, providerLon);
                return (
                  <tr key={index}>
                    <td>{provider.provider_last_name}, {provider.provider_first_name}</td>
                    <td>{provider.negotiated_rate}</td>
                    <td>{providerDistance.toFixed(2)} miles</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
        <button onClick={handleBack}>Back</button>
      </div>
    </>
  );
}
