import React, { useState } from 'react';

import CountryDetails from './CountryDetails';

export default function CountriesListItem({ country }) {
  const [showDetails, setShowDetails] = useState(false);

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <div>
      <span>{country.name}</span>
      <button type="button" onClick={toggleDetails}>
        {showDetails ? 'hide' : 'show'}
      </button>
      {showDetails && <CountryDetails country={country} />}
    </div>
  );
}
