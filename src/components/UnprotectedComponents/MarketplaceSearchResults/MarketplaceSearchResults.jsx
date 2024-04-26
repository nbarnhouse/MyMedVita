import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './MarketplaceSearchResults.css';

import NavBar from '../../AccessoryComponents/Nav/Nav';

export default function MarketplaceSearchResults() {
  const history = useHistory();
  const { procedureCode, zip, distance, providers: initialProviders } = useSelector((state) => state.distance);
  const [providers, setProviders] = useState(initialProviders);
  const [sortedByPrice, setSortedByPrice] = useState(null); // null: not sorted, true: ascending, false: descending
  const [sortedByDistance, setSortedByDistance] = useState(null); // null: not sorted, true: ascending, false: descending

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

  function filterPoints(centerLat, centerLon, points, maxDistance) {
    const filteredPoints = points.filter((point) => {
      const distance = haversine(centerLat, centerLon, point[0], point[1]);
      return distance <= maxDistance;
    });
    return filteredPoints;
  }

  useEffect(() => {
    setProviders(initialProviders); // Reset providers whenever initialProviders changes
  }, [initialProviders]);

  const sortByPrice = () => {
    const sorted = [...providers].sort((a, b) => {
      if (sortedByPrice === null || sortedByPrice) {
        return a.negotiated_rate - b.negotiated_rate;
      } else {
        return b.negotiated_rate - a.negotiated_rate;
      }
    });
    setProviders(sorted);
    setSortedByPrice(sortedByPrice === null ? true : !sortedByPrice);
    setSortedByDistance(null); // Reset distance sorting
  };

  const sortByDistance = () => {
    const sorted = [...providers].sort((a, b) => {
      const distanceA = haversine(centerLat, centerLon, parseFloat(a.provider_lat), parseFloat(a.provider_long));
      const distanceB = haversine(centerLat, centerLon, parseFloat(b.provider_lat), parseFloat(b.provider_long));
      if (sortedByDistance === null || sortedByDistance) {
        return distanceA - distanceB;
      } else {
        return distanceB - distanceA;
      }
    });
    setProviders(sorted);
    setSortedByDistance(sortedByDistance === null ? true : !sortedByDistance);
    setSortedByPrice(null); // Reset price sorting
  };

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
                <h2>Price <button onClick={sortByPrice}>{sortedByPrice ? '↑' : '↓'}</button></h2>
              </th>
              <th>
                <h2>Distance <button onClick={sortByDistance}>{sortedByDistance ? '↑' : '↓'}</button></h2>
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
