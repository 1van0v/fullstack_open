const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { MONGO_URI: mongoUrl } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const { requestLogger, errorHandler } = require("./utils/middleware");

module.exports.dbSetup = mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

module.exports.app = app;
