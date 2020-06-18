import React from 'react';

import Part from './Part';

export default function Content({ parts }) {
  console.log('content', parts);
  return (
    <table>
      <tbody>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </tbody>
    </table>
  );
}
