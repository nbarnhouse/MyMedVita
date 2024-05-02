import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import './LogOutButton.css';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button className="Logout" onClick={() => dispatch({ type: 'LOGOUT' })}>
      <LogoutIcon fontSize="small" />
    </Button>
  );
}

export default LogOutButton;
