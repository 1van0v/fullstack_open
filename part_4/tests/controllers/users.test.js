const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const { app, dbSetup } = require("../../app");
const user = require("../../models/user");
const createTestUser = require("../create_test_user");
const api = supertest(app);

describe("Users controller", () => {
  const url = "/api/users/";

  beforeAll(async () => {
    await dbSetup;
    await user.deleteMany({});
  });

  describe("GET request", () => {
    test("should contain no users", async () => {
      const { body: users } = await api.get(url).expect(200);
      expect(users).toHaveLength(0);
    });

    test("should return posted user", async () => {
      const testUser = createTestUser();
      await api.post(url).send(testUser).expect(201);
      const { body: createdUsers } = await api.get(url).expect(200);
      expect(createdUsers).toHaveLength(1);
    });

    test("should return posted users", async () => {
      const testUser = createTestUser(2);
      await api.post(url).send(testUser).expect(201);
      const { body: createdUsers } = await api.get(url).expect(200);
      expect(createdUsers).toHaveLength(2);
    });

    test("should return id, name and username fields", async () => {
      const testUser = createTestUser(3);
      await api.post(url).send(testUser);
      const { body: users } = await api.get(url);
      expect(
        users.every(
          (user) => user.id && user.name && user.username && !user.passwordHash
        )
      ).toEqual(true);
    });

    afterAll(async () => user.deleteMany({}));
  });

  describe("Create user", () => {
    const testUser = createTestUser();

    test("should return a created user with id, name and username", async () => {
      const { body: createdUser } = await api.post(url).send(testUser);
      expect(createdUser.id).toBeDefined();
      expect(createdUser.name).toEqual(testUser.name);
      expect(createdUser.username).toEqual(testUser.username);
      expect(createdUser.passwordHash).toBeUndefined();
    });

    test("should hash the provided password and store it in DB", async () => {
      const testHash = "hashed";
      const userToCreate = { ...testUser, username: "eeeee" };
      const hashSpy = jest.spyOn(bcrypt, "hash").mockReturnValue(testHash);

      const { body: createdUser } = await api
        .post(url)
        .send(userToCreate)
        .expect(201);
      expect(hashSpy).toHaveBeenCalledWith(testUser.password, 10);

      const userInDB = await user.findById(createdUser.id);
      expect(userInDB.passwordHash).toEqual(testHash);
    });

    describe("user validation", () => {
      test("should return reject user creation when username is less then 3 symbols", async () => {
        const newUser = { ...testUser, username: "a" };
        await api.post(url).send(newUser).expect(400);
      });

      test("should reject user creation with the same username", async () => {
        await api.post(url).send(testUser).expect(201);
        await api.post(url).send(testUser).expect(400);
      });

      test("should reject user creation if password is shorter then 3 symbols", async () => {
        const userToCreate = { ...testUser, password: "1" };
        await api.post(url).send(userToCreate).expect(400);
        const createdUsers = await user.find({});
        expect(createdUsers).toHaveLength(0);
      });

      afterEach(async () => user.deleteMany({}));
    });
  });

  afterAll(async () => await mongoose.connection.close());
});
