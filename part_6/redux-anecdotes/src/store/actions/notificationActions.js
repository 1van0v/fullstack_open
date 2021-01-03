let messageTimer;

function setNotification(message, duration) {
  return function (dispatch) {
    dispatch(notify(message));

    if (messageTimer) {
      clearTimeout(messageTimer);
    }

    messageTimer = setTimeout(() => dispatch(clearMessage()), duration * 1000);
  };
}

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

export default { setNotification, notify, clearMessage };
