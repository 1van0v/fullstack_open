const user = require("../models/user");

async function userValidator(req, res, next) {
  const { username, password } = req.body;

  if (!password || password.length < 3) {
    return next(new ValidationError("invalid password"));
  }

  if (!username || username.length < 3) {
    return next(new ValidationError("invalid username"));
  }

  const { username: storedUser } =
    (await user.findOne({ username }).exec()) || {};

  if (storedUser) {
    return next(new ValidationError("user already exists"));
  }

  return next();
}

function ValidationError(message) {
  this.message = message;
  this.name = "ValidationError";
}

module.exports = userValidator;
