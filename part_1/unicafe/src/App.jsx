import React, { useState } from 'react';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <button onClick={() => addFeedback(good, setGood)}>good</button>
      <button onClick={() => addFeedback(neutral, setNeutral)}>neutral</button>
      <button onClick={() => addFeedback(bad, setBad)}>bad</button>
      <h1>Statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </>
  );
}

function addFeedback(state, handler) {
  handler(state + 1);
}
