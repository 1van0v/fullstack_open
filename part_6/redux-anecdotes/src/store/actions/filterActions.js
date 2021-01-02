function setFilter(filter) {
  return {
    type: "SET_FILTER",
    data: { filter },
  };
}

export default { setFilter };
