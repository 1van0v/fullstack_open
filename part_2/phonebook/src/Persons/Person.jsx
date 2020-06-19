import React from 'react';

export default function Person({ person }) {
  const { name, number } = person;
  return (
    <div>
      {name} {number}
    </div>
  );
}
