import React from 'react';

const Content = ({ parts }) => parts.map(
  ({ part, value }) => <p>{part} {value}</p>
);

export default Content;