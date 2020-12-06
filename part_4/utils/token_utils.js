const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function generateToken(data) {
  return jwt.sign(data, JWT_SECRET);
}

function getTokenFrom(request) {
  const tokenStartIndex = "bearer ".length;
  const authorizationHeader = request.get("authorization") || "";
  const token = authorizationHeader.substring(tokenStartIndex);
  console.log("token", token);
  return token ? validateToken(token) : "";
}

function createAuthHeader(token) {
  return { Authorization: `bearer ${token}` };
}

module.exports = {
  validateToken,
  generateToken,
  getTokenFrom,
  createAuthHeader,
};
