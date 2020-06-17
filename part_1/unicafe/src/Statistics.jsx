import React from 'react';

export default function Statistics({ good, neutral, bad }) {
  const all = good + neutral + bad;
  const average = (good - bad) / all;

  return (
    <>
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
