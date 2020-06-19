import React, { useState } from 'react';
import './App.css';

function App() {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  function addPerson(e) {
    e.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">name:</label>
          <input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <button>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name }, index) => (
        <div key={index}>{name}</div>
      ))}
    </div>
  );
}

export default App;
