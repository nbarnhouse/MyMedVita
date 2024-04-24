// Import 3rd Party Libraries
import React from 'react';
import { useHistory } from 'react-router-dom';

// Import Custom Components
import NavBar from '../../AccessoryComponents/Nav/Nav';
// import LoginForm from './LoginForm/LoginForm';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <NavBar />
      {/* <LoginForm /> */}
      <h1>Login Page</h1>
    </div>
  );
}

export default LoginPage;
