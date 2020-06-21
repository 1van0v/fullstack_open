import React, { useState, useEffect } from 'react';

import Filter from './Filter';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Message from './Message';
import personsService from './services/persons';

import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService
      .getPersons()
      .then((fetchedPersons) => setPersons(fetchedPersons))
      .catch(() => showMessage('Could not fetch persons', true));
  }, []);

  function addPerson(person) {
    const indexToUpdate = persons.findIndex(({ name }) => person.name === name);

    if (indexToUpdate < 0) {
      return personsService
        .addPerson(person)
        .then((person) => {
          setPersons(persons.concat(person));
          showMessage(`${person.name} has been successfully added to phonebook`);
        })
        .catch(() => showMessage(`Something went wrong. ${person.name} was not added.`, true));
    }

    const isUpdate = window.confirm(
      `${person.name} is already added to phonebook, replace the old number with a new one?`
    );

    if (isUpdate) {
      const updated = persons[indexToUpdate];
      personsService
        .updateNumber(updated.id, person)
        .then(() => showMessage(`Number of ${person.name} has been changed to ${person.number}`))
        .then(() => {
          const copied = persons.slice();
          copied[indexToUpdate] = { ...updated, number: person.number };
          setPersons(copied);
        })
        .catch(() => showMessage(`Something went wrong. ${person.name} was not updated.`, true));
    }
  }

  function showMessage(text, isError) {
    const message = {
      text,
      type: isError ? 'error' : 'notify'
    };

    setMessage(message);
    setTimeout(() => setMessage(null), 5000);
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handler={setSearch} />
      <PersonForm addPerson={addPerson} />
      <Persons persons={persons} filter={search} updater={setPersons} notifier={showMessage} />
      <Message message={message} />
    </>
  );
}

export default App;
