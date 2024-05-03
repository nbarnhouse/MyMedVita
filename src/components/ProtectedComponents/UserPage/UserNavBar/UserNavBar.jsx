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
  InputAdornment,
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
        height: '100vh',
        borderRight: 'solid 1px black',
        overflow: 'hidden',
      }}
      role="presentation">
      <List>
        {/* User Profile */}
        <ListItem
          button
          component={RouterLink}
          to="/userEdit"
          selected={isActive('/userEdit')}
          sx={{
            color: 'black',
            backgroundColor: isActive('/userEdit') ? '#782cf6' : 'transparent',
            marginLeft: '10px',
            marginTop: '5px',
            '&:hover': { backgroundColor: '#782cf6', color: 'white' },
          }}>
          <ListItemText primary={<><AccountCircleIcon /> User Profile</>} />
        </ListItem>
        {/* Saved Searches */}
        <ListItem
          button
          component={RouterLink}
          to="/savedSearches"
          selected={isActive('/savedSearches')}
          sx={{
            color: 'black',
            backgroundColor: isActive('/savedSearches') ? '#782cf6' : 'transparent',
            marginLeft: '10px',
            marginTop: '5px',
            '&:hover': { backgroundColor: '#782cf6', color: 'white' },
          }}>
          <ListItemText primary={<><SavedSearchIcon /> Saved Searches</>} />
        </ListItem>
        {/* Logout */}
        <ListItem
          button
          component={RouterLink}
          to="/home" // Assuming this is the logout destination
          onClick={handleLogout} // Attach onClick handler only to the "Logout" list item
          sx={{
            color: 'black',
            backgroundColor: isActive('/home') ? '#782cf6' : 'transparent',
            marginLeft: '10px',
            marginTop: '5px',
            '&:hover': { backgroundColor: '#782cf6', color: 'white' },
          }}>
          <ListItemText primary={<><LogOutButton sx={{ textAlign: 'left' }} /> Logout</>} />
        </ListItem>
      </List>
    </Box>
  );
}

export default UserNavBar;
