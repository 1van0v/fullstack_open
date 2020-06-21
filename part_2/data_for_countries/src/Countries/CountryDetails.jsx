import React from 'react';

import Languages from './Languages';
import WeatherReport from './WeatherReport';

export default function CountryDetails({ country }) {
  const { name, capital, population, languages, flag } = country;

  return (
    <>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <Languages languages={languages} />
      <img alt="flag" src={flag} width="100px" />
      <WeatherReport city={capital} />
    </>
  );
}
