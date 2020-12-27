const logger = require("./logger");
const { AuthenticationError } = require("./errors");
const { getTokenFrom } = require("./token_utils");
const User = require("../models/user");

function requestLogger(req, res, next) {
  logger.info(res.statusCode, req.method, req.path, req.body);
  next();
}

function unknownEndpoint(req, res, next) {
  res.status(404).send({ error: "unknown endpoint" });
}

function errorHandler(error, req, res, next) {
  let status = 500;
  logger.error(error);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    status = 400;
  } else if (error instanceof AuthenticationError) {
    status = 401;
  }

  return res.status(status).json({ error: error.message });
}

async function authorizationHandler(req, res, next) {
  const token = getTokenFrom(req);

  try {
    const user = await User.findById(token.id);

    if (!user) {
      throw new Error("no such user");
    }
    req.token = token;
    req.authorized_user = user;
    return next();
  } catch (e) {
    return next(new AuthenticationError("token is missing or invalid"));
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  authorizationHandler,
};
