import React from 'react';

export default function Voter({ text, state, updater }) {
  return <button onClick={() => updater(state + 1)}>{text}</button>;
}
