const mongoose = require("mongoose");
const supertest = require("supertest");

const { app, dbSetup } = require("../../app");
const blog = require("../../models/blog");
const user = require("../../models/user");
const { createAuthHeader } = require("../../utils/token_utils");
const createTestUser = require("../create_test_user");
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
  let createdUser;
  let token;

  beforeAll(async () => {
    await dbSetup;
    await blog.deleteMany({});
    await user.deleteMany({});

    const testUser = createTestUser();
    const { body } = await api.post("/api/users").send(testUser).expect(201);
    const { username, password } = testUser;
    const loginResponse = await api
      .post("/api/login")
      .send({ username, password });
    token = loginResponse.body.token;
    createdUser = body;
  });

  test("should contain no blogs", async () => {
    const response = await api.get(url);
    expect(response.body.length).toBe(0);
  });

  describe("GET request", () => {
    beforeAll(async () => {
      for (const blog of initialBlogs) {
        await api.post(url).set(createAuthHeader(token)).send(blog).expect(201);
      }
    });

    test("should add blogs to user", async () => {
      const { body: createdBlogs } = await api.get(url);
      const { body: createdUsers } = await api.get("/api/users");

      expect(createdUsers[0].blogs).toHaveLength(2);
      createdUsers[0].blogs.forEach((blog, index) => {
        const { user, ...blogInBlogs } = createdBlogs[index];
        expect(blog).toMatchObject(blogInBlogs);
      });
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
    test("should return 401 if a request does not have token header", async () => {
      await api.post(url).send(initialBlogs[0]).expect(401);
    });

    test("should return 400 if a posted blog does not have title", async () => {
      const { title, ...testBlog } = initialBlogs[0];

      await api
        .post(url)
        .set(createAuthHeader(token))
        .send(testBlog)
        .expect(400);
    });

    test("should return 400 if a posted blog does not have url", async () => {
      const { url: excludedUrl, ...testBlog } = initialBlogs[0];

      await api
        .post(url)
        .set(createAuthHeader(token))
        .send(testBlog)
        .expect(400);
    });

    test("should set likes to 0 if that property is missed", async () => {
      const { likes, ...testBlog } = initialBlogs[0];

      const { body: createdBlog } = await api
        .post(url)
        .set(createAuthHeader(token))
        .send(testBlog);
      expect(createdBlog).toMatchObject({ ...testBlog, likes: 0 });
    });

    test("should link created blog to user", async () => {
      await api
        .post(url)
        .set(createAuthHeader(token))
        .send(initialBlogs[1])
        .expect(201);
      const { body: createdBlogs } = await api.get(url).expect(200);

      const [createdBlog] = createdBlogs;
      const { blogs, ...storedUser } = createdUser;
      expect(createdBlog.user).toMatchObject(storedUser);
    });

    afterAll(async () => await blog.deleteMany({}));
  });

  describe("DELETE request", () => {
    beforeEach(async () => {
      const [testBlog] = initialBlogs;

      await blog.deleteMany({});
      await api
        .post(url)
        .set(createAuthHeader(token))
        .send(testBlog)
        .expect(201);
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
        .set(createAuthHeader(token))
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
      await api
        .put(url + blogId)
        .send({})
        .expect(200);
      const { body: blogsAfterUpdate } = await api.get(url);
      expect(blogsBeforeUpdate[0]).toMatchObject(blogsAfterUpdate[0]);
    });
  });

  afterAll(async () => await mongoose.connection.close());
});

module.exports.initialBlogs = initialBlogs;
