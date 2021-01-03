import React, { useEffect } from "react";
import { connect } from "react-redux";

import anecdoteActions from "../store/actions/anecdoteActions";

function AnecdoteList(props) {
  useEffect(() => {
    props.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => props.vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
}

const mapStateToProps = ({ anecdotes, filter }) => {
  return {
    anecdotes: filter
      ? anecdotes.filter((i) => i.content.toLowerCase().includes(filter))
      : anecdotes,
    filter,
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps, {
  fetch: anecdoteActions.fetch,
  vote: anecdoteActions.vote,
})(AnecdoteList);

export default ConnectedAnecdoteList;
