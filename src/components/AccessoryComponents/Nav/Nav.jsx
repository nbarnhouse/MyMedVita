import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        <Link className="navLink" to="/">
          Home
        </Link>

        <Link className="navLink" to="/marketplace">
          Marketplace
        </Link>

        <Link className="navLink" to="/features">
          Features
        </Link>

        <Link className="navLink" to="/about">
          About
        </Link>

        <Link className="navLink" to="/contact">
          Contact
        </Link>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <div>
            <Link className="navLink" to="/login">
              Login
            </Link>
          </div>
        )}
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/profile">
              Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
