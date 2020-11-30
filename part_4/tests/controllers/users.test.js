const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const { app, dbSetup } = require("../../app");
const user = require("../../models/user");
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
      const testUser = {
        username: "test",
        name: "test name",
        password: "test",
      };
      await api.post(url).send(testUser).expect(201);
      const { body: createdUsers } = await api.get(url).expect(200);
      expect(createdUsers).toHaveLength(1);
    });

    test("should return posted users", async () => {
      const testUser = {
        username: "test1",
        name: "test name1",
        password: "test1",
      };
      await api.post(url).send(testUser).expect(201);
      const { body: createdUsers } = await api.get(url).expect(200);
      expect(createdUsers).toHaveLength(2);
    });

    test("should return id, name and username fields", async () => {
      const testUser = {
        name: "test2",
        username: "test2",
        password: "test2",
      };
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

  describe("POST request", () => {
    const testUser = {
      username: "test",
      name: "name",
      password: "test",
    };

    test("should return a created user with id, name and username", async () => {
      const { body: createdUser } = await api.post(url).send(testUser);
      expect(createdUser.id).toBeDefined();
      expect(createdUser.name).toEqual(testUser.name);
      expect(createdUser.username).toEqual(testUser.username);
      expect(createdUser.passwordHash).toBeUndefined();
    });

    test("should hash the provided password and store it in DB", async () => {
      const testHash = "hashed";
      const hashSpy = jest.spyOn(bcrypt, "hash").mockReturnValue(testHash);

      const { body: createdUser } = await api
        .post(url)
        .send(testUser)
        .expect(201);
      expect(hashSpy).toHaveBeenCalledWith(testUser.password, 10);

      const userInDB = await user.findById(createdUser.id);
      expect(userInDB.passwordHash).toEqual(testHash);
    });
  });
});
