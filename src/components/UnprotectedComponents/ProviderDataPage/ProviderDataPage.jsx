// Import 3rd Party Libraries
 import React, { useState, useEffect } from 'react';
 import { useSelector } from 'react-redux';
 import { useHistory, useLocation } from 'react-router-dom';
 import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

 // Import Custom Components
 import NavBar from '../../AccessoryComponents/Nav/Nav';
 import Footer from '../../AccessoryComponents/Footer/Footer';

 // Import Material UI and Custom CSS
 import { Button } from '@mui/material';
 import './ProviderDataPage.css';

 function ProviderDataPage() {
   const history = useHistory();
   const location = useLocation();
   const provider = location.state?.provider || {};

   useEffect(() => {
     console.log('Provider on details page:', provider);
   }, [provider]);

   // Function to user back click
   const handleBackClick = () => {
     history.push('/results');
   };

   const isValidProvider = provider.provider_lat && provider.provider_long;
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
           <div className="provider-details-information-container">
             {[
               {
                 label: 'Provider',
                 content: `${provider.provider_first_name || ''} ${
                   provider.provider_last_name || ''
                 } ${provider.provider_credential || ''}`,
               },
               {
                 label: 'Procedure',
                 content: provider.CPT_CODE || 'No CPT Code Listed',
               },
               {
                 label: 'Address',
                 content: (
                   <>
                     {provider.provider_address || ''}
                     <br />
                     {`${provider.provider_city || ''} ${
                       provider.provider_state || ''
                     } ${provider.provider_zip || ''}`}
                   </>
                 ),
               },
               {
                 label: 'Pricing',
                 content: `$${
                   provider.negotiated_rate
                     ? Math.floor(provider.negotiated_rate)
                     : 'No Price Listed'
                 }`,
               },
               {
                 label: 'Phone Number',
                 content: provider.provider_phone || 'No Number Listed',
               },
               { label: 'Distance', content: 'Need to Add Distance Here' },
             ].map((info, index) => (
               <div key={index} className="provider-info-div">
                 <h5 className="provider-info-header">{info.label}</h5>
                 <p className="provider-info-paragraph">{info.content}</p>
               </div>
             ))}
           </div>
           <div className="provider-details-map-container">
             {isValidProvider ? (
               <MapContainer
                 className="provider-map"
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
             ) : (
               <p>No location data available for this provider.</p>
             )}
           </div>
         </div>
         <div className="provider-details-button-container">
           <Button
             variant="contained"
             size="large"
             style={{ backgroundColor: '#782cf6', color: 'white' }}
             sx={{
               transition: 'transform 0.3s',
               '&:hover': { transform: 'scale(1.1)' },
             }}
             onClick={handleBackClick}
           >
             Back
           </Button>
         </div>
         <Footer />
       </div>
     </>
   );
 }

 export default ProviderDataPage;
