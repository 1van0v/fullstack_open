import React from 'react';

export default function Anecdote({ anecdote }) {
  return (
    <div>
      <span>{anecdote.text} </span>
      <span>{anecdote.votes} votes</span>
    </div>
  );
}
