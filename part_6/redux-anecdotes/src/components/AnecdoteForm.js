import React from "react";
import { useDispatch } from "react-redux";

import * as anecdoteActions from "../actions/anecdoteActions";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(anecdoteActions.create(content));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  );
}
