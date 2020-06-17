import React, { useState } from 'react';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;

  const average = (good - bad) / all;

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
      <div>all {all}</div>
      <div>average {average || 0}</div>
      <div>positive {(good / all) * 100 || 0}%</div>
    </>
  );
}

function addFeedback(state, handler) {
  handler(state + 1);
}
