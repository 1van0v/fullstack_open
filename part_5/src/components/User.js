import React from "react";

export default ({ username, doLogout }) => {
  return (
    <div>
      <span id="username">{username}</span>
      <button id="logout-button" type="button" onClick={doLogout}>
        logout
      </button>
    </div>
  );
};
