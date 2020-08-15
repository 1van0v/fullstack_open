const logger = require("./logger");

function requestLogger(req, res, next) {
  logger.info(res.statusCode, req.method, req.path, req.body);
  next();
}

function unknownEndpoint(req, res, next) {
  res.status(404).send({ error: "unknown endpoint" });
}

function errorHandler(error, req, res, next) {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
