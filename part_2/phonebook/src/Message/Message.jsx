import React from 'react';

import './Message.css';

export default function Message({ message }) {
  if (message === null) {
    return null;
  }

  const { text, type } = message;
  const messageClasses = 'message ' + type;

  return <div className={messageClasses}>{text}</div>;
}
