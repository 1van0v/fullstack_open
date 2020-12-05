const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const userValidator = require("../utils/user_validator");

usersRouter.get("/", async (req, res, next) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
    author: 1,
  });
  res.json(users);
  return next();
});

usersRouter.post("/", userValidator, async (req, res, next) => {
  const saltRound = 10;

  try {
    const { username, name, password } = req.body;
    const passwordHash = await bcrypt.hash(password, saltRound);
    const user = new User({ username, name, passwordHash });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    return next(error);
  }
  return next();
});

module.exports = usersRouter;
