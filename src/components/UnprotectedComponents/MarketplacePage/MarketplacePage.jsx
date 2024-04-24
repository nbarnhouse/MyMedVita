// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProcedureSearchBar from  './ProcedureSearchBar/ProcedureSearchBar';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

function MarketplacePage() {
  const history = useHistory();

  return (
    <>
      <NavBar />
      <h1>Marketplace Page</h1>
      <form>
        <ProcedureSearchBar />
      </form>
    </>
  );
}

export default MarketplacePage;
