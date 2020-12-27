const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { MONGO_URI: mongoUrl, NODE_ENV } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const resetRouter = require("./controllers/reset");
const { requestLogger, errorHandler } = require("./utils/middleware");

module.exports.dbSetup = mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

if (NODE_ENV === "test") {
  app.use("/api/testing/reset", resetRouter);
}

app.use(errorHandler);

module.exports.app = app;
