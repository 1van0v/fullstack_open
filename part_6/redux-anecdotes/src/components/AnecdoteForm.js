import React from "react";
import { connect } from "react-redux";

import anecdoteActions from "../store/actions/anecdoteActions";

function AnecdoteForm(props) {
  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";

    props.sendAnecdote(content);
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

const ConnectedAnecdoteForm = connect(null, {
  sendAnecdote: anecdoteActions.post,
})(AnecdoteForm);

export default ConnectedAnecdoteForm;
