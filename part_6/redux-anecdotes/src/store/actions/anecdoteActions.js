import anecdotesService from "../../services/anecdotes";

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

function fetch() {
  return async function (dispatch) {
    const anecdotes = await anecdotesService.getAll();
    dispatch(init(anecdotes));
  };
}

export default { vote, create, init, fetch };
