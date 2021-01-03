const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data.anecdotes.slice();
    case "UPDATE_ANECDOTE":
      return state
        .map((i) => (i.id === action.data.id ? { ...action.data } : i))
        .sort((a, b) => b.votes - a.votes);
    case "CREATE":
      return state.concat(action.data);
    default:
      return state;
  }
};

export default reducer;
