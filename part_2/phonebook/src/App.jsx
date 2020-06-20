import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './Filter';
import Persons from './Persons';
import PersonForm from './PersonForm';

import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/persons').then(({ data }) => setPersons(data));
  }, []);

  function addPerson(person) {
    if (persons.some(({ name }) => person.name === name)) {
      return alert(`${person.name} is already added to phonebook`);
    }

    setPersons(persons.concat(person));
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handler={setSearch} />
      <PersonForm addPerson={addPerson} />
      <Persons persons={persons} filter={search} />
    </>
  );
}

export default App;
