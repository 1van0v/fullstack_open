const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const user = require("../models/user");
const { authorizationHandler } = require("../utils/middleware");
const { AuthenticationError } = require("../utils/errors");

blogsRouter.get("/", async (req, res, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
  return next();
});

blogsRouter.post("/", authorizationHandler, async (req, res, next) => {
  try {
    const userId = req.token.id;
    const selectedUser = await user.findById(userId);
    const newBlog = new Blog({ ...req.body, user: userId });

    const createdBlog = await newBlog.save();

    selectedUser.blogs.push(createdBlog._id);
    await selectedUser.save();

    res.status(201).json(createdBlog);
  } catch (error) {
    return next(error);
  }
  return next();
});

blogsRouter.delete("/:id", authorizationHandler, async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findOneAndDelete({
      _id: req.params.id,
      user: req.token.id,
    });

    if (!deletedBlog) {
      throw new AuthenticationError("unauthorized to delete this blog");
    }

    res.status(204).end();
    return next();
  } catch (error) {
    return next(error);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const status = result ? 200 : 404;
    res.status(status).json(result);
  } catch (error) {
    return next(error);
  }
  return next();
});

module.exports = blogsRouter;
