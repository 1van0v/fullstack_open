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
  const url = "/api/blogs/";

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
      for (const blog of initialBlogs) {
        await api.post(url).send(blog).expect(201);
      }
    });

    test("should contain one blog", async () => {
      const response = await api.get(url);

      expect(response.body).toHaveLength(2);
      response.body.forEach((blog, index) => {
        const { id, ...storedBlog } = blog;
        expect(storedBlog).toMatchObject(initialBlogs[index]);
      });
    });

    test("should have id property is set up", async () => {
      const { body: data } = await api.get(url);

      expect(data[0].id).toBeDefined();
      expect(data[1].id).toBeDefined();
    });
  });

  describe("POST request", () => {
    test("should set likes to 0 if that property is missed", async () => {
      const { likes, ...testBlog } = initialBlogs[0];

      const { body: createdBlog } = await api.post(url).send(testBlog);
      expect(createdBlog).toMatchObject({ ...testBlog, likes: 0 });
    });

    test("should return 400 if a posted blog does not have title", async () => {
      const { title, ...testBlog } = initialBlogs[0];

      await api.post(url).send(testBlog).expect(400);
    });

    test("should return 400 if a posted blog does not have url", async () => {
      const { url: excludedUrl, ...testBlog } = initialBlogs[0];

      await api.post(url).send(testBlog).expect(400);
    });

    afterAll(async () => await blog.deleteMany({}));
  });

  describe("DELETE request", () => {
    beforeEach(async () => {
      const [testBlog] = initialBlogs;

      await blog.deleteMany({});
      await api.post(url).send(testBlog).expect(201);
    });

    test("should delete specified blog", async () => {
      const { body: blogs } = await api.get(url);
      expect(blogs).toHaveLength(1);

      await api.delete(url + blogs[0].id);
      const { body: restBlogs } = await api.get(url);
      expect(restBlogs).toHaveLength(0);
    });
  });

  describe("PUT request", () => {
    let blogId;

    beforeEach(async () => {
      const [testBlog] = initialBlogs;
      await blog.deleteMany({});
      const { body: createdBlog } = await api
        .post(url)
        .send(testBlog)
        .expect(201);
      blogId = createdBlog.id;
    });

    test("should update property of blog", async () => {
      const propertyToUpdate = {
        title: "new Title",
        author: "new Author",
        url: "new Url",
        likes: 3,
      };
      const { body: updatedBlog } = await api
        .put(url + blogId)
        .send(propertyToUpdate);
      expect(updatedBlog).toMatchObject({ id: blogId, ...propertyToUpdate });
    });

    test("should return 404 when specified id does not exist", async () => {
      await api
        .put(url + mongoose.Types.ObjectId())
        .send({ title: "test" })
        .expect(404);
    });

    test("should not change blog if no properties were specified", async () => {
      const { body: blogsBeforeUpdate } = await api.get(url);
      const { body: updatedBlog } = await api
        .put(url + blogId)
        .send({})
        .expect(200);
      expect(blogsBeforeUpdate[0]).toMatchObject(updatedBlog);
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
