import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import anecdoteActions from "../store/actions/anecdoteActions";
import notificationActions from "../store/actions/notificationActions";

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

  const vote = ({ id, content }) => {
    dispatch(anecdoteActions.vote(id));
    dispatch(notificationActions.notify(`you voted "${content}`));
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
