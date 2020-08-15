const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const logger = require("./utils/logger");
const { PORT = 3003, MONGO_URI: mongoUrl } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const { requestLogger } = require("./utils/middleware");

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogsRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
