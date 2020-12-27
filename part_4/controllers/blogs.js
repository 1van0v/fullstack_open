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
    const {
      authorized_user,
      token: { id: userId },
    } = req;
    const newBlog = new Blog({ ...req.body, user: userId });

    const createdBlog = await newBlog.save();

    if (!authorized_user.blogs) {
      authorized_user.blogs = [];
    }

    authorized_user.blogs.push(createdBlog._id);
    await authorized_user.save();

    const { username, name } = authorized_user;

    res.status(201).json({
      ...createdBlog.toJSON(),
      user: { username, name, id: userId },
    });
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

blogsRouter.put("/:id", authorizationHandler, async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!result) {
      return res.status(404).end();
    }

    const { blogs, ...user } = req.authorized_user.toJSON();
    res.status(200).json({ ...result.toJSON(), user });
  } catch (error) {
    return next(error);
  }
  return next();
});

module.exports = blogsRouter;
