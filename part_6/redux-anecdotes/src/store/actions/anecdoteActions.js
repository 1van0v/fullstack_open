import anecdotesService from "../../services/anecdotes";
import notificationActions from "./notificationActions";

function vote({ votes, ...anecdote }) {
  return async function (dispatch) {
    const updated = await anecdotesService.update({
      ...anecdote,
      votes: votes + 1,
    });

    dispatch(update(updated));
    dispatch(
      notificationActions.setNotification(`you voted "${anecdote.content}`, 5)
    );
  };
}

function update(anecdote) {
  return {
    type: "UPDATE_ANECDOTE",
    data: anecdote,
  };
}

function post(text) {
  return async function (dispatch) {
    const anecdote = await anecdotesService.create(text);

    dispatch(create(anecdote));
    dispatch(notificationActions.setNotification(`you created "${text}"`, 5));
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

export default { vote, update, create, init, fetch, post };
