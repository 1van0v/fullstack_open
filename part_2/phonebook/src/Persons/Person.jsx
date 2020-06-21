import React from 'react';

import personsService from '../services/persons';

export default function Person({ person, deleteHandler, notifier }) {
  const { name, number } = person;

  function deletePerson(person) {
    let isConfirmed = window.confirm(`${person.name} is about to be deleted. Please confirm.`);

    if (isConfirmed) {
      personsService
        .deletePerson(person)
        .then(() => {
          deleteHandler(person);
        })
        .catch(() => notifier(`Something went wrong. ${person.name} was not deleted.`, true));
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
