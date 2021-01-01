import React from 'react';

import Statistics from './Statistics';
import Voter from './Voter';

export default function App({ store }) {
  return (
    <>
      <h1>Give feedback</h1>
      <Voter text="good" state={store} action={{ type: 'GOOD' }} />
      <Voter text="neutral" state={store} action={{ type: 'OK' }} />
      <Voter text="bad" state={store} action={{ type: 'BAD' }} />
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
    </>
  );
}
