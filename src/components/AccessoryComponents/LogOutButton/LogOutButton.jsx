import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import './LogOutButton.css';
import { Typography } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      className="Logout"
      style={{
        textTransform: 'none',
        color: 'black',
        fontSize: '16px',
      }}
      onClick={() => dispatch({ type: 'LOGOUT' })}>
      <LogoutIcon fontSize="small" />
      Log Out
    </Button>
  );
}

export default LogOutButton;
