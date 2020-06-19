import React, { useState } from 'react';

export default function PersonForm({ addPerson }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  function submitPerson(e) {
    e.preventDefault();
    addPerson({ name: newName, number: newNumber });
    setNewName('');
    setNewNumber('');
  }

  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={submitPerson}>
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
    </>
  );
}
