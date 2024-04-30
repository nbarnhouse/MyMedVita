// Import 3rd party libraries
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Import Custom Components
import NavBar from '../../AccessoryComponents/Nav/Nav';
import Footer from '../../AccessoryComponents/Footer/Footer';

// Import Material UI and CSS files
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import './MarketplaceSearchResults.css';
import 'leaflet/dist/leaflet.css';

export default function MarketplaceSearchResults() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);


  // Obtain provider data from the database and store in an object
  const {
    procedureCode,
    zip,
    distance,
    providers: initialProviders,
  } = useSelector((state) => state.distance);

  const [providers, setProviders] = useState(initialProviders);
  // null: not sorted, true: ascending, false: descending
  const [sortedByPrice, setSortedByPrice] = useState(null);
  // null: not sorted, true: ascending, false: descending
  const [sortedByDistance, setSortedByDistance] = useState(null);

  const centerLat = 36.1539;
  const centerLon = -95.9927;

  // Function to handle a "back" button click
  const handleBackClick = () => {
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

  // Reset providers whenever initialProviders changes
  useEffect(() => {
    console.log(user);
    setProviders(initialProviders);
  }, [initialProviders]);

  // Prevent the page from being scrollable
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Revert the background color back when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Function to route user to Provider Details Page
  const handleDetailsClick = (provider) => {
    console.log('PROVIDER:', provider);
    history.push({
      pathname: '/details',
      state: { provider: provider },
    });
  };

  // Function to sort by Price
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
    // Reset distance sorting
    setSortedByDistance(null);
  };

  // Function to sort by Distance
  const sortByDistance = () => {
    const sorted = [...providers].sort((a, b) => {
      const distanceA = haversine(
        centerLat,
        centerLon,
        parseFloat(a.provider_lat),
        parseFloat(a.provider_long)
      );
      const distanceB = haversine(
        centerLat,
        centerLon,
        parseFloat(b.provider_lat),
        parseFloat(b.provider_long)
      );
      if (sortedByDistance === null || sortedByDistance) {
        return distanceA - distanceB;
      } else {
        return distanceB - distanceA;
      }
    });
    setProviders(sorted);
    setSortedByDistance(sortedByDistance === null ? true : !sortedByDistance);
    // Reset price sorting
    setSortedByPrice(null);
  };


  return (
    <>
      <NavBar />
      <div className="container">
        <div className="result-header-container">
          <h1 className="result-header-h1">
            <span style={{ color: '#782cf6' }}>My</span>
            MedVita Search Results
          </h1>
          <p className="result-header-paragraph">
            CPT Code: {procedureCode} Zip: {zip} within {distance} Miles
          </p>
        </div>
        <div className="result-container">
          <div className="result-table-container">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Provider</TableCell>
                    <TableCell>
                      Price{' '}
                      <Button onClick={sortByPrice}>
                        {sortedByPrice ? '↑' : '↓'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      Distance{' '}
                      <Button onClick={sortByDistance}>
                        {sortedByDistance ? '↑' : '↓'}
                      </Button>
                    </TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {providers &&
                    providers.map((provider, index) => {
                      if (provider.provider_lat && provider.provider_long) {
                        const providerLat = parseFloat(provider.provider_lat);
                        const providerLon = parseFloat(provider.provider_long);
                        const providerDistance = haversine(
                          centerLat,
                          centerLon,
                          providerLat,
                          providerLon
                        );
                        // Check if user is logged in and whether the index is beyond the first 6
                        const blurClass =
                          !user.id && index >= 6 ? 'blur' : '';
                        return (
                          <TableRow key={index} className={blurClass}>
                            <TableCell>
                              {provider.provider_last_name},{' '}
                              {provider.provider_first_name}{' '}
                              {provider.provider_credential}
                            </TableCell>
                            <TableCell>
                              ${Math.floor(provider.negotiated_rate)}
                            </TableCell>
                            <TableCell>
                              {Math.floor(providerDistance)} miles
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => handleDetailsClick(provider)}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                      return null;
                    })}
                </TableBody>
              </Table>
            </TableContainer>
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
              {providers &&
              //if user is logged in show all pins on map, if not only show first 6
                (user.id ? providers : providers.slice(0, 6)).map((provider, index) => {
                  // Ensure provider latitude and longitude are defined before rendering the marker
                  if (provider.provider_lat && provider.provider_long) {
                    const providerLat = parseFloat(provider.provider_lat);
                    const providerLon = parseFloat(provider.provider_long);
                    return (
                      <Marker key={index} position={[providerLat, providerLon]}>
                        <Popup>
                          {provider.provider_last_name},{' '}
                          {provider.provider_first_name}
                        </Popup>
                      </Marker>
                    );
                  }
                  return null;
                })}
            </MapContainer>
          </div>
        </div>
        {!user.id && (
              <p style={{ textAlign: 'center', color: '#FF0000' }}>
                Login or create an account to see all results
              </p>
            )}
        <div className="result-button-container">
          <Button
            variant="outlined"
            size="large"
            onClick={handleBackClick}
            sx={{
              backgroundColor: '#782CF6',
              color: 'white',
              margin: '10px auto',
              '&:hover': {
                backgroundColor: '#782CF6',
                color: 'white',
                transform: 'scale(1.05)',
              },
            }}
          >
            Back
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
