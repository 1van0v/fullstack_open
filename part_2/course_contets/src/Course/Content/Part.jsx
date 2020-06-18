import React from 'react';

export default function Part({ part }) {
  const { name, exercises } = part;

  return (
    <tr>
      <td>{name}</td>
      <td>{exercises}</td>
    </tr>
  );
}
