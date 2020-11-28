const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { MONGO_URI: mongoUrl } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const { requestLogger } = require("./utils/middleware");

module.exports.dbSetup = mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogsRouter);

module.exports.app = app;
