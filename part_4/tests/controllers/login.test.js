const mongoose = require("mongoose");
const supertest = require("supertest");

const { app, dbSetup } = require("../../app");
const user = require("../../models/user");
const createTestUser = require("../create_test_user");
const { validateToken } = require("../../utils/token_utils");
const api = supertest(app);

describe("Login controller", () => {
  const url = "/api/login";
  let testUser = createTestUser();
  let { username, password } = testUser;
  let createdTestUser;

  beforeAll(async () => {
    await dbSetup;
    await user.deleteMany({});
    const response = await api.post("/api/users").send(testUser);
    createdTestUser = response.body;
  });

  test("should send 200 for successful login", async () => {
    await api.post(url).send({ username, password }).expect(200);
  });

  test("should send valid JWT token", async () => {
    const response = await api.post(url).send({ username, password });
    const decodedToken = validateToken(response.body.token);
    expect(decodedToken).toMatchObject({
      id: createdTestUser.id,
      username: createdTestUser.username,
    });
  });

  test("should return 401 for unknown username", async () => {
    await api
      .post(url)
      .send({ username: "unknown_user", password: "test" })
      .expect(401);
  });

  test("should return token if password are correct", async () => {
    const { body: authResult } = await api
      .post(url)
      .send({ username, password });
    expect(authResult.token).toBeDefined();
  });

  test("should return 401 if password is invalid", async () => {
    await api.post(url).send({ username, password: "incorrect" }).expect(401);
  });

  afterAll(async () => {
    await user.deleteMany({});
    await mongoose.connection.close();
  });
});
