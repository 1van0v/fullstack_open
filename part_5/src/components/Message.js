import React, { useEffect } from "react";

export default ({ message, setMessage }) => {
  const type = message.isError ? "error" : "info";

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }, []);

  return <div className={"message " + type}>{message.message}</div>;
};
