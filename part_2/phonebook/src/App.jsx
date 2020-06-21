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
    const indexToUpdate = persons.findIndex(({ name }) => person.name === name);

    if (indexToUpdate < 0) {
      return personsService.addPerson(person).then((person) => setPersons(persons.concat(person)));
    }

    const isUpdate = window.confirm(
      `${person.name} is already added to phonebook, replace the old number with a new one?`
    );

    if (isUpdate) {
      const updated = persons[indexToUpdate];
      personsService
        .updateNumber(updated.id, person)
        .then(() => alert(`Number of ${person.name} has been changed to ${person.number}`))
        .then(() => {
          const copied = persons.slice();
          copied[indexToUpdate] = { ...updated, number: person.number };
          setPersons(copied);
        });
    }
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
