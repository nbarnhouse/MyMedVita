// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';
import './FeaturesPage.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import styled from 'styled-components';

function FeaturesPage() {
  const history = useHistory();

  return (
    <div>
      <NavBar />
      <div className="feature-container">
        <div className="featurePageDiv">
          <h1>Features</h1>
          <p>
            <AddCircleOutlineIcon
              className="featurePageIcons"
              fontSize="large"
            />{' '}
            <b className="featurePageWords">Search</b> your healthcare services
            by CPT* or description
          </p>
          <p>
            <TravelExploreIcon className="featurePageIcons" fontSize="large" />{' '}
            <b className="featurePageWords">Sort</b> by provider, price, and
            distance
          </p>
          <p>
            <MenuBookIcon className="featurePageIcons" fontSize="large" />{' '}
            <b className="featurePageWords">Select</b> a provider to call and
            schedule
          </p>
        </div>
        <div className="featurePageDiv">
          <h2>How it works</h2>
          <p>
            HealthCare services are coded by Current Procedural Terminology or{' '}
            <b className="featurePageWords">CPT codes</b>
          </p>
          <p>
            CPT codes have a price that insurers have negotiated to{' '}
            <b className="featurePageWords">pay providers</b>
          </p>
          <p>
            Providers in the same city using the same CPT code{' '}
            <b className="featurePageWords">can vary up to 600% in price</b>
          </p>
          <p>
            So-if you don't know the price before you go,{' '}
            <b className="featurePageWords">your wallet might be running low</b>
          </p>
        </div>
        <div className="finePrint">
          <i>
            Note: *Providers* are not necessarily the medical clinicians,
            meaning <u>a clinician might not have control over the prices</u>{' '}
            but rather it might be the administrator staff negotiating those
            prices with insurers.
          </i>
        </div>
        <div className="featureDetailsDiv">
          <h1>Additional Information:</h1>
          <h2>Disclaimers</h2>
          <p>
            <b className="featurePageWords">MyMedVita</b> is independent of
            insurers and providers and believes consumers can be empowered with
            healthcare pricing transparency
          </p>
        </div>
        <div className="featureDetailsDiv">
          <h2>Insurance</h2>
          <p>
            You can search by{' '}
            <b className="featurePageWords">
              you insurance, other insurance, or all insurances
            </b>{' '}
            to learn what a provider has negotiated for a price
          </p>
        </div>
        <div className="featureDetailsDiv">
          <h2>No Insurance?</h2>
          <p>
            It could be possible to negotiate a price with a provider of your
            choosing regardless of what kind of insurance you might have or even
            if you don't have insurance.{' '}
            <b className="featurePageWords">MyMedVita</b> allows you to see
            prices that providers will be reimbursed for and the provider might
            be willing to service you at that rate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;
