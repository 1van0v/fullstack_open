import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import anecdoteActions from "../store/actions/anecdoteActions";

export default function AnecdoteForm() {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    filter
      ? anecdotes.filter((i) => i.content.toLowerCase().includes(filter))
      : anecdotes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(anecdoteActions.fetch());
  }, [dispatch]);

  const vote = (anecdote) => {
    dispatch(anecdoteActions.vote(anecdote));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
}
