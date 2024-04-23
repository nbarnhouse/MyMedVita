// Import Modules
import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import Material UI
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

// Logo Image
import logoImage from './images/logo_heart_only_MMV.png';

function Nav() {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (pathname) => location.pathname === pathname;

  // List of nav links to be mapped over and placed into navbar
  const navButtonsList = [
    'marketplace',
    'features',
    'about',
    'contact',
    user.id ? 'profile' : 'login',
  ];
  return (
    <AppBar position="static" sx={{ backgroundColor: '#782cf6' }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            <img
              src={logoImage}
              alt="a picture of a heart - the logo for the company"
              style={{ maxWidth: 60, maxHeight: '100%' }}
            />
            MyMedVita
          </Button>
        </Typography>
        {/* Rest of links from navButtonsList variable */}
        {navButtonsList.map((path) => (
          <Button
            key={path}
            color="inherit"
            component={RouterLink}
            to={`/${path}`}
            sx={{
              '&:hover': { backgroundColor: 'white', color: '#782cf6' },
              backgroundColor: isActive(`/${path}`) ? 'white' : 'transparent',
              color: isActive(`/${path}`) ? '#782cf6' : 'white',
              margin: '0 4px',
            }}
          >
            {path}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
