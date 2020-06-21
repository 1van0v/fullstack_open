import React, { useState, useEffect } from 'react';

import Filter from './Filter';
import Persons from './Persons';
import PersonForm from './PersonForm';
import personsService from './services/persons';

import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    personsService.getPersons().then((fetchedPersons) => setPersons(fetchedPersons));
  }, []);

  function addPerson(person) {
    if (persons.some(({ name }) => person.name === name)) {
      return alert(`${person.name} is already added to phonebook`);
    }

    personsService.addPerson(person).then((person) => setPersons(persons.concat(person)));
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handler={setSearch} />
      <PersonForm addPerson={addPerson} />
      <Persons persons={persons} filter={search} updater={setPersons} />
    </>
  );
}

export default App;
