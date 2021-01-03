import anecdotesService from "../../services/anecdotes";
import notificationActions from "./notificationActions";

function vote(id) {
  return {
    type: "VOTE",
    data: {
      id,
    },
  };
}

function post(text) {
  return async function (dispatch) {
    const anecdote = await anecdotesService.create(text);

    dispatch(create(anecdote));
    dispatch(notificationActions.notify(`you created "${text}"`));
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

export default { vote, create, init, fetch, post };
