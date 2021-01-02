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
    data: {
      content: anecdote,
    },
  };
}

export default { vote, create };
