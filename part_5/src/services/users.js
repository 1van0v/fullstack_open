import axios from "axios";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

let authData;

const login = async (username, password) => {
  const response = await axios.post("/api/login", { username, password });

  const { token } = response.data;

  toLocalStorage(token);

  return (authData = decodeToken(token));
};

const checkLocalStorage = (setUser) => {
  let parsedToken = null;
  const storedToken = localStorage.getItem("app_auth_token");

  if (storedToken) {
    parsedToken = decodeToken(storedToken);
    setUser(parsedToken);
  }

  return (authData = parsedToken);
};

function decodeToken(token) {
  const decoded = {
    ...jwt.verify(token, process.env.REACT_APP_TOKEN_SECRET),
    token,
  };

  return decoded;
}

function toLocalStorage(token) {
  localStorage.setItem("app_auth_token", token);
}

const logOut = () => {
  localStorage.removeItem("app_auth_token");
  authData = null;
};

const addAuthHeader = (data, headers) => {
  headers.Authorization = `bearer ${authData.token}`;
  headers["Content-Type"] = "application/json";
  return JSON.stringify(data);
};

export default {
  login,
  checkLocalStorage,
  logOut,
  addAuthHeader,
};
