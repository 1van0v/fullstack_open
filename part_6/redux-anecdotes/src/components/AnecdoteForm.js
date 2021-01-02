import React from "react";
import { useDispatch } from "react-redux";

import anecdoteActions from "../store/actions/anecdoteActions";
import notificationActions from "../store/actions/notificationActions";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(anecdoteActions.create(content));
    dispatch(notificationActions.notify(`you created "${content}"`));
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
