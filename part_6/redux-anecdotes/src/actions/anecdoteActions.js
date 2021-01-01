export function vote(id) {
  return {
    type: "VOTE",
    data: {
      id,
    },
  };
}

export default vote;
