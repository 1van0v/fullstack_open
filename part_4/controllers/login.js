const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");

const { findUserByUsername } = require("../utils/find_user_by_username");
const { AuthenticationError } = require("../utils/errors");
const { generateToken } = require("../utils/token_utils");

loginRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const storedUser = await findUserByUsername(username);

    if (!storedUser.username) {
      throw new AuthenticationError("invalid username");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      storedUser.passwordHash
    );

    if (!isPasswordValid) {
      throw new AuthenticationError("invalid password");
    }

    const token = generateToken({
      id: storedUser.id,
      username: storedUser.username,
      name: storedUser.name,
    });

    res.status(200).json({ token });
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = loginRouter;
