import React, { useState } from 'react';

import Filter from './Filter';
import Persons from './Persons';
import PersonForm from './PersonForm';

import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [search, setSearch] = useState('');

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
