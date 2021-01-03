function getAll() {
  return fetch("/anecdotes").then((res) => res.json());
}

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

function create(anecdote) {
  return fetch("/anecdotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(asObject(anecdote)),
  }).then((res) => res.json());
}

function update(anecdote) {
  return fetch(`/anecdotes/${anecdote.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  }).then((res) => res.json());
}

export default { getAll, create, update };
