import React from 'react';

import Anecdote from './Anecdote';

export default function TopAnecdote({ anecdotes }) {
  const top = anecdotes.reduce((acc, i) => {
    return acc.votes < i.votes ? i : acc;
  });

  if (top.votes === 0) {
    return <div>Please vote for an anecdote</div>;
  }

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={top} />
    </>
  );
}
