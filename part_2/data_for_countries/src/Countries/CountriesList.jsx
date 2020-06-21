import React from 'react';

export default function CountriesList({ countries }) {
  return countries.map(({ name }) => <div key={name}>{name}</div>);
}
