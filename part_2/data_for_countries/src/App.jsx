import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './Filter';
import Countries from './Countries';

import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(({ data }) => setCountries(data));
  }, []);

  return (
    <>
      <Filter updateHandler={setQuery} />
      <Countries countries={getCountries(countries, query)} />
    </>
  );
}

function getCountries(countries, query) {
  const searchString = query.toLowerCase();
  return countries.filter(({ name }) => name.toLowerCase().includes(searchString));
}

export default App;
