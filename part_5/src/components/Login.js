import React, { useState } from "react";

export default ({ doLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const isFormFilled = login || password;
  const isFormValid = [login, password].every((field) => field.length >= 3);

  const resetForm = () => {
    setLogin("");
    setPassword("");
  };

  const initLogin = (event) => {
    event.preventDefault();
    doLogin(login, password);
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={initLogin}>
        <label htmlFor="login">Username:</label>
        <input
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <br></br>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button
          id="cancel-login"
          type="button"
          disabled={!isFormFilled}
          onClick={resetForm}
        >
          Cancel
        </button>
        <button id="submit" type="submit" disabled={!isFormValid}>
          Log In
        </button>
      </form>
    </div>
  );
};
