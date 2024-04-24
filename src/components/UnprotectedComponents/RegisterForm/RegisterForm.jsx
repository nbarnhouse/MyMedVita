//page was set up just to test registration routes, feel free to change

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [passwordsMatch, setPasswordsMatch] = useState(true); 
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();

    const registerUser = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            dispatch({
            type: 'REGISTER',
            payload: {
                email: email,
                phone: phone,
                first_name: firstName,
                last_name: lastName,
                dob: dob,
                gender: gender,
                street_address: streetAddress,
                city: city,
                state: state,
                zip: zipCode,
                password: password,
            },
        })
        } else {
        setPasswordsMatch(false);
        }
    }; // end registerUser

    useEffect(() => {
    if (errors.registrationSuccess) {
      // If registration was successful, dispatch the LOGIN action
        dispatch({
            type: 'LOGIN',
            payload: {
                email: email,
                password: password,
            },
        });
    }
    }, [errors.registrationSuccess]);

    return (
        <form className="formPanel" onSubmit={registerUser}>
        <h2>Register User</h2>
        {errors.registrationMessage && (
            <h3 className="alert" role="alert">
            {errors.registrationMessage}
            </h3>
        )}
        <div>
            <label htmlFor="email">
            Email:
            <input
                type="text"
                name="email"
                value={email}
                required
                onChange={(event) => setEmail(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="phone">
            Phone Number:
            <input
                type="text"
                name="phone"
                value={phone}
                required
                onChange={(event) => setPhone(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="firstName">
            First Name:
            <input
                type="text"
                name="firstName"
                value={firstName}
                required
                onChange={(event) => setFirstName(event.target.value)}
            />
            </label>
            </div>
            <div>
            <label htmlFor="lastName">
            Last Name:
            <input
                type="text"
                name="lastName"
                value={lastName}
                required
                onChange={(event) => setLastName(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="dob">
            Date of Birth:
            <input
                type="date"
                name="dob"
                value={dob}
                required
                onChange={(event) => setDob(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="gender">
            Gender:
            <input
                type="text"
                name="gender"
                value={gender}
                required
                onChange={(event) => setGender(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="streetAddress">
            Street Address:
            <input
                type="text"
                name="streetAddress"
                value={streetAddress}
                required
                onChange={(event) => setStreetAddress(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="city">
            City:
            <input
                type="text"
                name="city"
                value={city}
                required
                onChange={(event) => setCity(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="state">
            State:
            <input
                type="text"
                name="state"
                value={state}
                required
                onChange={(event) => setState(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="zipCode">
            Zip Code:
            <input
                type="text"
                name="zipCode"
                value={zipCode}
                required
                onChange={(event) => setZipCode(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="password">
            Password:
            <input
                type="password"
                name="password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
            />
            </label>
        </div>
        <div>
            <label htmlFor="confirmPassword">
            Confirm Password:
            <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                required
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
            </label>
            {!passwordsMatch && <p>Passwords do not match</p>}
        </div>
        <div>
            <input className="btn" type="submit" name="submit" value="Register" />
        </div>
        </form>
    );
}

export default RegisterForm;
