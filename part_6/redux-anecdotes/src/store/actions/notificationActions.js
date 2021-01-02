function notify(message) {
  return {
    type: "NOTIFY",
    data: { message },
  };
}

function clearMessage() {
  return {
    type: "CLEAR_MESSAGE",
  };
}

export default { notify, clearMessage };
