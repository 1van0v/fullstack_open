import React, { useState } from 'react';

import Statistics from './Statistics';

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

function addFeedback(state, handler) {
  handler(state + 1);
}
