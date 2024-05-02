import React from 'react';
import { useSelector } from 'react-redux';
import UserNavBar from './UserNavBar/UserNavBar';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <UserNavBar />
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
