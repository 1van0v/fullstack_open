import React from 'react';

export default function Filter({ handler }) {
  function fireChange(e) {
    handler(e.target.value);
  }

  return (
    <>
      <label htmlFor="search">filter shown with </label>
      <input id="search" onChange={fireChange} />
    </>
  );
}
