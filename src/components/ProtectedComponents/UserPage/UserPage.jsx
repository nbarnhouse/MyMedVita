import React from 'react';

// Import 3rd Party Libraries
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

// CUSTOM COMPONENTS
import Navbar from '../../AccessoryComponents/Nav/Nav';
import UserNavBar from './UserNavBar/UserNavBar';

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((store) => store.userDetails);

  const formattedDate = moment(userDetails.dob).format('MM-DD-YYYY');

  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_DATA',
      payload: Response.data,
    });
  }, []);

  const navBack = () => {
    history.push('/userEdit');
  };

  return (
    <div className="saved-container">
      <Navbar />
      <div className="saved-bottom-container">
        <UserNavBar />
        {/* <h1>User Navbar Placeholder</h1> */}
        <div className="saved-right-container">
          <h4>Personal Details:</h4>
          <p>First Name: {userDetails.first_name}</p>
          <p>Last Name: {userDetails.last_name}</p>
          <p>Email Address: {userDetails.email}</p>
          <p>Phone Number: {userDetails.phone? userDetails.phone.substring(0,3)+"-"+userDetails.phone.substring(3,6)+"-"+userDetails.phone.substring(6): 'No Phone Number Listed'}</p>
          <p>DOB: {formattedDate}</p>
          <p>Gender: {userDetails.gender}</p>
          <h4>Address:</h4>
          <p>Street: {userDetails.street_address}</p>{' '}
          <p>City: {userDetails.city}</p>
          <p>State: {userDetails.state}</p>
          <p>Zip Code: {userDetails.zip}</p>
      <button onClick={navBack}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
