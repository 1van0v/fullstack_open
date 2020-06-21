import React from 'react';

export default function Filter({ updateHandler }) {
  function typingHandler(e) {
    updateHandler(e.target.value);
  }

  return (
    <>
      <label htmlFor="search">find countries</label>
      <input id="search" onChange={typingHandler} />
    </>
  );
}
