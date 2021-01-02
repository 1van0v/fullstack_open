function vote(id) {
  return {
    type: "VOTE",
    data: {
      id,
    },
  };
}

function create(anecdote) {
  return {
    type: "CREATE",
    data: anecdote,
  };
}

function init(anecdotes) {
  return {
    type: "INIT_ANECDOTES",
    data: { anecdotes },
  };
}

export default { vote, create, init };
