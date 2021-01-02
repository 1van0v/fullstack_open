function getAll() {
  return fetch("/anecdotes").then((res) => res.json());
}

export default { getAll };
