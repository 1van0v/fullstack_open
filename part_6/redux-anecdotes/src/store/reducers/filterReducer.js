const initialFilter = "";

const reducer = (state = initialFilter, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data.filter.toLowerCase();
    default:
      return state;
  }
};

export default reducer;
