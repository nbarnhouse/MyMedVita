import React from 'react';

import { useHistory } from 'react-router-dom';

import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />
      <h1>Register Page</h1>
    </div>
  );
}

export default RegisterPage;
