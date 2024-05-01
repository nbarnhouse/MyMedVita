import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import LogOutButton from '../../../AccessoryComponents/LogOutButton/LogOutButton';

import { Box, List, ListItem, ListItemText } from '@mui/material';

function UserNavBar() {
  const location = useLocation();

  // Function to determine if current route is active
  const isActive = (pathname) => location.pathname === pathname;
  //Nav Items & links
  const navItems = [
    { text: 'User Profile', path: '/userEdit' },
    { text: 'Saved Searches', path: '/savedSearches' },
  ];

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
        {navItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              color: 'black',
              backgroundColor: isActive(item.path) ? '#782cf6' : 'transparent',
              marginLeft: '10px',
              marginTop: '5px',
              '&:hover': { backgroundColor: '#782cf6', color: 'white' },
            }}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <LogOutButton />
    </Box>
  );
}

export default UserNavBar;
