import React from 'react';

export default function Voter({ text, state, action }) {
  return <button onClick={() => state.dispatch(action)}>{text}</button>;
}
