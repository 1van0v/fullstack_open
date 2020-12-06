const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function generateToken(data) {
  return jwt.sign(data, JWT_SECRET);
}

module.exports = { validateToken, generateToken };
