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

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
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
