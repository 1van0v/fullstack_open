const { findUserByUsername } = require("./find_user_by_username");
const { ValidationError } = require("./errors");

async function userValidator(req, res, next) {
  const { username, password } = req.body;

  if (!password || password.length < 3) {
    return next(new ValidationError("invalid password"));
  }

  if (!username || username.length < 3) {
    return next(new ValidationError("invalid username"));
  }

  const { username: storedUser } = findUserByUsername(username);

  if (storedUser) {
    return next(new ValidationError("user already exists"));
  }

  return next();
}

module.exports = userValidator;
