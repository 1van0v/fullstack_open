import React from 'react';

import personsService from '../services/persons';

export default function Person({ person, deleteHandler }) {
  const { name, number } = person;

  function deletePerson(person) {
    let isConfirmed = window.confirm(`${person.name} is about to be deleted. Please confirm.`);

    if (isConfirmed) {
      personsService.deletePerson(person).then(() => {
        alert(`${person.name} has been deleted`);
        deleteHandler(person);
      });
    }
  }

  return (
    <div>
      <span>
        {name} {number}
      </span>
      <button onClick={() => deletePerson(person)}>delete</button>
    </div>
  );
}
