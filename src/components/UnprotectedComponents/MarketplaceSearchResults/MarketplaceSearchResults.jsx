// Import 3rd Party Libraries
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios'; 

import 'leaflet/dist/leaflet.css';
import './MarketplaceSearchResults.css';

import NavBar from '../../AccessoryComponents/Nav/Nav';

export default function MarketplaceSearchResults() {
  const history = useHistory();
  const { procedureCode, zip, distance, providers } = useSelector((state) => state.distance);

  // const [providers, setProviders] = useState([]);
  // const [filteredPoints, setFilteredPoints] = useState([]);
  // const [originalZip, setOriginalZip] = useState('');
  // const [originalDistance, setOriginalDistance] = useState('');

  const centerLat = 36.1539;
  const centerLon = -95.9927;

  const points = [
    [36.1539, -95.9927],
    [33.6609, -95.5555],
    [35.9334, -95.8776],
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post('/api/search', {
  //         procedureCode: data.procedureCode,
  //         zip: data.zip,
  //         distance: data.distance,
  //       });
  //       console.log('RESPONSE', response);
  //       setProviders(response.data); // Update state with received provider data
  //       setOriginalZip(data.zip);
  //       setOriginalDistance(data.distance);
  //     } catch (error) {
  //       console.error('Error fetching provider data:', error);
  //     }
  //   };
  
  //   fetchData(); // Call fetchData function when component mounts
  // }, [data]); // Call useEffect whenever data changes
  

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
            Search Parameters: {procedureCode}, {zip}, {distance} Miles
          </h4>
        </div>
        <div className="map-container">
        <MapContainer className="map" center={[centerLat, centerLon]} zoom={6}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {providers.map((provider, index) => (
    // Ensure provider latitude and longitude are defined before rendering the marker
    // Use parseFloat to convert string values to numbers if necessary
    (provider.provider_lat && provider.provider_lon) && (
      <Marker key={index} position={[parseFloat(provider.provider_lat), parseFloat(provider.provider_lon)]}></Marker>
    )
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
            {providers.map((provider, index) => (
              <tr key={index}>
                <td>{provider.provider_name}</td>
                <td>{provider.price}</td>
                <td>{provider.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleBack}>Back</button>
      </div>
    </>
  );
}
