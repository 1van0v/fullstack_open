import React from 'react';

import CountriesListItem from './CountriesListItem';

export default function CountriesList({ countries }) {
  return countries.map((country) => <CountriesListItem key={country.name} country={country} />);
}
