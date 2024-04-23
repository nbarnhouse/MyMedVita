// Import 3rd Party Libraries
import React from 'react';
// import LoginForm from './LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      {/* <LoginForm /> */}
      <h1>Login Page</h1>
    </div>
  );
}

export default LoginPage;
