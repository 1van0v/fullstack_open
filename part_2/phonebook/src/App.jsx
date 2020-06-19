import React, { useState } from 'react';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  function addPerson(e) {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <label htmlFor="search">filter shown with </label>
        <input id="search" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">name:</label>
          <input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="number">number:</label>
          <input id="number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button>add</button>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter(({ name }) => name.toLowerCase().includes(search))
        .map(({ name, number }) => (
          <div key={name}>
            {name} {number}
          </div>
        ))}
    </div>
  );
}

export default App;
