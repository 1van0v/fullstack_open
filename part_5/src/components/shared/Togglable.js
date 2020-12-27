import React, { useState } from "react";

export default ({ actionTitle, children, id }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const showButton = (
    <div>
      <button id={`show-${id}`} onClick={toggleVisibility}>
        {actionTitle}
      </button>
    </div>
  );

  const hiddenElement = (
    <div>
      {children}
      <button id={`cancel-${id}`} onClick={toggleVisibility}>
        Cancel
      </button>
    </div>
  );

  return visible ? hiddenElement : showButton;
};
