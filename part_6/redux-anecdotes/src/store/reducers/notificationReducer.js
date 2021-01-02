const notification = "";

const reducer = (state = notification, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.data.message;
    case "CLEAR_MESSAGE":
      return null;
    default:
      return notification;
  }
};

export default reducer;
