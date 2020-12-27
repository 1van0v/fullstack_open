const testRouter = require("express").Router();

const blog = require("../models/blog");
const user = require("../models/user");

testRouter.post("/", async (req, res, next) => {
  await blog.deleteMany({});
  await user.deleteMany({});
  res.status(200).end();
  return next();
});

module.exports = testRouter;
