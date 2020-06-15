import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

import './index.css';

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    { part: 'Fundamentals of React', value: 10 },
    { part: 'Using props to pass data', value: 7 },
    { part: 'State of a component', value: 14 }
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
