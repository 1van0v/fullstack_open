import React from 'react';

import Part from './Part';

export default function Content({ parts }) {
  let total = 0;

  return (
    <table>
      <tbody>
        {parts.map((part) => {
          total += part.exercises;

          return <Part key={part.id} part={part} />;
        })}
      </tbody>
      <tfoot>
        <tr colSpan={2}>
          <th>total of {total} exercises</th>
        </tr>
      </tfoot>
    </table>
  );
}
