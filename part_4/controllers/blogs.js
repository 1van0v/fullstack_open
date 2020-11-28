const blogsRouter = require("express").Router();

const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res, next) => {
  const blogs = await Blog.find({});
  res.json(blogs);
  return next();
});

blogsRouter.post("/", async (req, res, next) => {
  try {
    const newBlog = new Blog(req.body);

    const result = await newBlog.save();
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
  return next();
});

module.exports = blogsRouter;
