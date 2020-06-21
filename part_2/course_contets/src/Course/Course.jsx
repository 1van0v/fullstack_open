import React from 'react';

import Header from './Header';
import Content from './Content';

export default function Course({ course }) {
  const { name, parts } = course;

  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
    </>
  );
}
