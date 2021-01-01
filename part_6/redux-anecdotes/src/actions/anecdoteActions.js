export function vote(id) {
  return {
    type: "VOTE",
    data: {
      id,
    },
  };
}

export function create(anecdote) {
  return {
    type: "CREATE",
    data: {
      content: anecdote,
    },
  };
}

export default vote;
