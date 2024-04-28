// Import 3rd Party Modules
import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

// Import Material UI and Icons
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

function CategoryNavbar() {
  const location = useLocation();

  // Function to determine if current route is active
  const isActive = (pathname) => location.pathname === pathname;

  // Array of Nav Items/Links to be displayed on the side navbar
  const navItems = [
    { text: 'Outpatient Care', path: '/category/outpatient' },
    { text: 'Laboratory and Pathology', path: '/category/laboratory' },
    { text: 'Radiology', path: '/category/radiology' },
    { text: 'Surgery', path: '/category/surgery' },
  ];

  return (
    <Box
      sx={{
        width: 300,
        height: '100vh',
        borderRight: 'solid 1px black',
        overflow: 'hidden',
      }}
      role="presentation"
    >
      <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '20px' }}>
        Please Select a Category
      </Typography>
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
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default CategoryNavbar;
