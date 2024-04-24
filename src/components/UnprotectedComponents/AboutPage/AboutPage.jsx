// Import 3rd Party Libraries
import React from 'react';

// Import Custom Components
import NavBar from '../../AccessoryComponents/Nav/Nav';

function AboutPage() {
  return (
    <div>
      <NavBar />
      <div>
        <h1>About</h1>
        <img src="" />
        {/* Div for Founders */}
        <div>
          <h2>Founders</h2>
          <p>
            MyMedVita was founded by a medical doctor, health economist, and an
            engineer. With over 100 years of combine experience in the
            healthcare industry, they teamed up to empower consumers to navigate
            healthcare through price transparency.
          </p>
        </div>
        {/* Div for Mission */}
        <div>
          <h2>Mission</h2>
          <p>
            MyMedVita allows any insured or uninsured consumer to search, sort,
            and select their healthcare by price, provider, and distance so they
            know before they go.
          </p>
        </div>
        {/* Div for Vision */}
        <div>
          <h2>Vision</h2>
          <p>
            MyMedVita aspires to be the United States most trusted and
            independent healthcare marketplace where millions of consumers
            depend on its transparent information to empower their healthcare
            decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
