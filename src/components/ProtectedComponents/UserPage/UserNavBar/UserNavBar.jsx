import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import LogOutButton from '../../../AccessoryComponents/LogOutButton/LogOutButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import { useDispatch } from 'react-redux'; 

import {
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function UserNavBar() {
  const location = useLocation();
  const dispatch = useDispatch();

  function handleLogout(){
    console.log("logging out");
    dispatch({ type: 'LOGOUT' }); // Dispatching logout action
  };

  // Function to determine if current route is active
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <Box
      sx={{
        width: 300,
        borderRight: 'solid 1px black',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center items horizontally
      }}
      role="presentation">
      <List sx={{ textAlign: 'center' }}>
        {/* User Profile */}
        <ListItem
          button
          component={RouterLink}
          to="/profile"
          selected={isActive('/userEdit')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            backgroundColor: isActive('/userEdit') ? '#782cf6' : 'transparent',
            '&:hover': { backgroundColor: '#782cf6', color: 'white' },
          }}>
          <AccountCircleIcon sx={{ marginRight: '5px' }} />
          <ListItemText primary="User Profile" />
        </ListItem>
        {/* Saved Searches */}
        <ListItem
          button
          component={RouterLink}
          to="/savedSearches"
          selected={isActive('/savedSearches')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            backgroundColor: isActive('/savedSearches') ? '#782cf6' : 'transparent',
            '&:hover': { backgroundColor: '#782cf6', color: 'white' },
          }}>
          <SavedSearchIcon sx={{ marginRight: '5px' }} />
          <ListItemText primary="Saved Searches" />
        </ListItem>
        {/* Logout */}
        <ListItem
          button
          component={RouterLink}
          to="/home" // Assuming this is the logout destination
          onClick={handleLogout} // Attach onClick handler only to the "Logout" list item
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            backgroundColor: isActive('/home') ? '#782cf6' : 'transparent',
            '&:hover': { backgroundColor: '#782cf6', color: 'white' },
          }}>
          <LogOutButton sx={{ marginRight: '5px', textAlign: 'left'}} />
        </ListItem>
      </List>
    </Box>
  );
}

export default UserNavBar;
