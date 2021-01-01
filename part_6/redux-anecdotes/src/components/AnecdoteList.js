import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as anecdoteActions from "../actions/anecdoteActions";

export default function AnecdoteForm() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(anecdoteActions.vote(id));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
}
