const mongoose = require("mongoose");
const supertest = require("supertest");

const { app, dbSetup } = require("../../app");
const blog = require("../../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    title: "blog 1",
    author: "Author 1",
    url: "http://link1.com",
    likes: 1,
  },
  {
    title: "blog 2",
    author: "Author 2",
    url: "http://link2.com",
    likes: 2,
  },
];

describe("Blogs controller", () => {
  const url = "/api/blogs";

  beforeAll(async () => {
    await dbSetup;
    await blog.deleteMany({});
  });

  test("should contain no blogs", async () => {
    const response = await api.get(url);

    expect(response.body.length).toBe(0);
  });

  test("should contain one blog", async () => {
    await api.post(url).send(initialBlogs[0]).expect(201);

    const response = await api.get(url);

    expect(response.body).toHaveLength(1);
    const { id, ...storedBlog } = response.body[0];
    expect(storedBlog).toMatchObject(initialBlogs[0]);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
