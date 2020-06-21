import React from 'react';

import Person from './Person';

export default function Persons({ persons, filter, updater }) {
  function deletePerson(person) {
    updater(persons.filter((i) => i.id !== person.id));
  }

  return (
    <>
      <h2>numbers</h2>
      {persons
        .filter(({ name }) => name.toLowerCase().includes(filter))
        .map((person) => (
          <Person key={person.id} person={person} deleteHandler={deletePerson} />
        ))}
    </>
  );
}
