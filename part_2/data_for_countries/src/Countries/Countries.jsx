import React from 'react';

import CountriesList from './CountriesList';
import CountryDetails from './CountryDetails';

export default function Countries({ countries }) {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }

  return <CountriesList countries={countries} />;
}
