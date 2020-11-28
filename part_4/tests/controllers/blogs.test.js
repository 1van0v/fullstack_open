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

  describe("GET request", () => {
    beforeEach(async () => {
      await blog.deleteMany({});

      for (const blog of initialBlogs) {
        await api.post(url).send(blog).expect(201);
      }
    });

    test("should contain one blog", async () => {
      const response = await api.get(url);

      expect(response.body).toHaveLength(2);
      const { id, ...storedBlog } = response.body[0];
      expect(storedBlog).toMatchObject(initialBlogs[0]);
    });

    test("should have id property is set up", async () => {
      const { body: data } = await api.get(url);

      expect(data[0].id).toBeDefined();
      expect(data[1].id).toBeDefined();
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
