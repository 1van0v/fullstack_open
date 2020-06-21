import React from 'react';

export default function Languages({ languages }) {
  return (
    <>
      <h3>languages</h3>
      <ul>
        {languages.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>
  );
}
