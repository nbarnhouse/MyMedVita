// Import 3rd Party Libraries
import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LocationFindTest from '../LocationFindTest/LocationFindTest';

// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// Import Unprotected Components
import AboutPage from '../UnprotectedComponents/AboutPage/AboutPage';
import CategoryPage from '../UnprotectedComponents/CategoryPage/CategoryPage';
import ContactPage from '../UnprotectedComponents/ContactPage/ContactPage';
import FeaturesPage from '../UnprotectedComponents/FeaturesPage/FeaturesPage';
import LandingPage from '../UnprotectedComponents/LandingPage/LandingPage';
import LoginPage from '../UnprotectedComponents/LoginPage/LoginPage';
import MarketplacePage from '../UnprotectedComponents/MarketplacePage/MarketplacePage';
import MarketPlaceSearchResults from '../UnprotectedComponents/MarketplaceSearchResults/MarketplaceSearchResults';
import ProviderDataPage from '../UnprotectedComponents/ProviderDataPage/ProviderDataPage';
import RegisterPage from '../UnprotectedComponents/RegisterPage/RegisterPage';
import View404 from '../UnprotectedComponents/View404/View404';

// Import Protected Components
import UserPage from '../ProtectedComponents/UserPage/UserPage';

// Custom CSS
import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/marketplace">
            <MarketplacePage />
          </Route>
          <Route exact path="/features">
            <FeaturesPage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/contact">
            <ContactPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route
            // TESTING ROUTES FOR PAGE FEATURES
            // shows SearchResult Page at all times (logged in or not)
            exact
            path="/search"
          >
            <SearchResults />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute> */}

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <View404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
