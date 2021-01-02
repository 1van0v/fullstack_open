const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      console.log("anecdotes", action.data);
      return action.data.anecdotes.slice();
    case "VOTE":
      return state
        .map((i) =>
          i.id === action.data.id ? { ...i, votes: i.votes + 1 } : i
        )
        .sort((a, b) => b.votes - a.votes);
    case "CREATE":
      return state.concat(asObject(action.data.content));
    default:
      return state;
  }
};

export default reducer;
