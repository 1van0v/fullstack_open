const logger = require("./logger");
const { ValidationError, AuthenticationError } = require("./errors");

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
  } else if (error instanceof ValidationError) {
    status = 400;
  } else if (error instanceof AuthenticationError) {
    status = 401;
  }

  return res.status(status).json({ error: error.message });
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
