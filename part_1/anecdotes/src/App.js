import React, { useState } from 'react';

import Anecdote from './Anecdote';
import './App.css';

const anecdotes = [
  { text: 'If it hurts, do it more often', votes: 0 },
  { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
  {
    text:
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },
  {
    text:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },
  { text: 'Premature optimization is the root of all evil.', votes: 0 },
  {
    text:
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  }
];

function App() {
  const [selected, setSelected] = useState(anecdotes[0]);

  return (
    <div className="container">
      <Anecdote anecdote={selected} />
      <div>
        <button onClick={() => nextAnecdote(anecdotes, setSelected)}>next anecdote</button>
        <button onClick={() => vote(anecdotes, selected, setSelected)}>vote</button>
      </div>
    </div>
  );
}

function nextAnecdote(anecdotes, handler) {
  const { floor, random } = Math;
  const nextIndex = floor(random() * anecdotes.length);
  const nextJoke = { ...anecdotes[nextIndex] };
  handler(nextJoke);
}

function vote(anecdotes, anecdote, handler) {
  const index = anecdotes.findIndex((i) => i.text === anecdote.text);
  const updated = { ...anecdote, votes: anecdote.votes + 1 };
  anecdotes[index] = updated;

  handler(updated);
}

export default App;
