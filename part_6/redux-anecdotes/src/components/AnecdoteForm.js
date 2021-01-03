import React from "react";
import { useDispatch } from "react-redux";

import anecdoteActions from "../store/actions/anecdoteActions";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";

    dispatch(anecdoteActions.post(content));
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
