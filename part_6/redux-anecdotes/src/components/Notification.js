import React from "react";
import { useSelector, useDispatch } from "react-redux";

import notificationActions from "../store/actions/notificationActions";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  let notificationTimer;

  if (!notificationTimer && notification) {
    notificationTimer = setTimeout(() => {
      dispatch(notificationActions.clearMessage());
      notificationTimer = null;
    }, 5000);
  }

  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
