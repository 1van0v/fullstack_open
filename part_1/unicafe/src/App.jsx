import React, { useState } from 'react';

import Statistics from './Statistics';
import Voter from './Voter';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <Voter text="good" state={good} updater={setGood} />
      <Voter text="neutral" state={neutral} updater={setNeutral} />
      <Voter text="bad" state={bad} updater={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}
