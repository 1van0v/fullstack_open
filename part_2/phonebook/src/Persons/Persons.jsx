import React from 'react';

import Person from './Person';

export default function Persons({ persons, filter }) {
  return (
    <>
      <h2>numbers</h2>
      {persons
        .filter(({ name }) => name.toLowerCase().includes(filter))
        .map((person) => (
          <Person key={person.id} person={person} />
        ))}
    </>
  );
}
