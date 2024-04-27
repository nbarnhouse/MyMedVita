// Import 3rd Party Libraries
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Import Custom Components
import NavBar from '../../AccessoryComponents/Nav/Nav';

// Import Material UI and Custom CSS
import { Button } from '@mui/material';
import './ProviderDataPage.css';

function ProviderDataPage() {
  const history = useHistory();
  const location = useLocation();
  const { provider } = location.state || {};

  const handleBackClick = () => {
    history.push('/results');
  };

  useEffect(() => {
    console.log('PROVIDER ON DETAILS PAGE:', provider);
  }, []);

  // Check if provider object contains valid latitude and longitude values
  const isValidProvider =
    provider && provider.provider_lat && provider.provider_long;
  const centerLat = isValidProvider ? parseFloat(provider.provider_lat) : 0;
  const centerLon = isValidProvider ? parseFloat(provider.provider_long) : 0;

  return (
    <>
      <NavBar />
      <div className="provider-details-container">
        <div className="provider-details-header">
          <h1>Provider Details</h1>
        </div>
        <div className="provider-details-bottom-container">
          <div className="provider-details-information">
            <ul>
              <li>
                <strong>CMS Specialty Name:</strong>{' '}
                {provider.CMS_Specialty_Name}
              </li>
              <li>
                <strong>CPT Code:</strong> {provider.CPT_CODE}
              </li>
              <li>
                <strong>ID:</strong> {provider.id}
              </li>
              <li>
                <strong>Insurer ID:</strong> {provider.insurer_id}
              </li>
              <li>
                <strong>Negotiated Rate:</strong> {provider.negotiated_rate}
              </li>
              <li>
                <strong>Provider Address:</strong> {provider.provider_address}
              </li>
              <li>
                <strong>Provider City:</strong> {provider.provider_city}
              </li>
              <li>
                <strong>Provider Credential:</strong>{' '}
                {provider.provider_credential}
              </li>
              <li>
                <strong>Provider First Name:</strong>{' '}
                {provider.provider_first_name}
              </li>
              <li>
                <strong>Provider Last Name:</strong>{' '}
                {provider.provider_last_name}
              </li>
              <li>
                <strong>Provider Latitude:</strong> {provider.provider_lat}
              </li>
              <li>
                <strong>Provider Longitude:</strong> {provider.provider_long}
              </li>
              <li>
                <strong>Provider Organization Name:</strong>{' '}
                {provider.provider_organization_name}
              </li>
              <li>
                <strong>Provider Phone:</strong> {provider.provider_phone}
              </li>
              <li>
                <strong>Provider State:</strong> {provider.provider_state}
              </li>
              <li>
                <strong>Provider Zip:</strong> {provider.provider_zip}
              </li>
            </ul>
          </div>
          <div className="provider-details-map-container">
            {isValidProvider ? (
              <div className="map-container">
                <MapContainer
                  className="map"
                  center={[centerLat, centerLon]}
                  zoom={12}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[centerLat, centerLon]}>
                    <Popup>
                      {provider.provider_last_name},{' '}
                      {provider.provider_first_name}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            ) : (
              <p>No location data available for this provider.</p>
            )}
          </div>
        </div>
      </div>
      <button onClick={handleBackClick}>Back</button>
    </>
  );
}

export default ProviderDataPage;
