describe("Blog app", function () {
  const testUser = {
    username: "testUser",
    name: "Test User",
    password: "secret_2",
  };

  const { username, password } = testUser;

  before(function () {
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    cy.request("POST", "http://localhost:3000/api/users", testUser);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.get("#login").should("be.visible");
    cy.get("#password").should("be.visible");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login(username, password).then(() => {
        cy.get("#username").should("contain", testUser.username);
      });
      cy.logout();
    });

    describe("Failed login", function () {
      afterEach(function () {
        cy.get("#cancel-login").click();
      });

      it("fails with incorrect username", function () {
        const username = "invalid_user";
        const password = "not_secret";

        cy.login(username, password).then(() => {
          cy.get(".message.error").should("contain", "invalid username");
        });
      });

      it("fails with incorrect password", function () {
        const { username } = testUser;
        const password = "not_secret";

        cy.login(username, password).then(() => {
          cy.get(".message.error").should("contain", "invalid password");
        });
      });
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      const { username, password } = testUser;
      cy.request("POST", "http://localhost:3000/api/login", {
        username,
        password,
      }).then((res) => {
        localStorage.setItem("app_auth_token", res.body.token);
      });
    });

    it("can create blog", function () {
      cy.createBlog("first blog", "test author", "test url");
      cy.countBlogs(1);
    });

    it("should add a new blog", function () {
      cy.createBlog("second blog", "test author2", "test url2");
      cy.countBlogs(2);
    });

    it("should like a blog", function () {
      cy.likeBlog("first blog");
    });

    it("should delete a blog", function () {
      cy.deleteBlog("first blog").then(() =>
        cy.get(".message.info").should("contain", "first blog")
      );
    });

    it("should hide delete button if user is not an author of the blog", function () {
      const username = "secondUser";
      const password = "second_secret";

      cy.logout();
      cy.request("POST", "http://localhost:3000/api/users", {
        username,
        password,
        name: "second user",
      });
      cy.login(username, password);
      cy.toggleBlog("second blog").then((el) => {
        expect(el.find(".delete-blog")).to.have.length(0);
      });
      cy.toggleBlog("second blog");
    });

    it("should order blogs according to likes", function () {
      cy.createBlog("first blog", "test author1", "test url1");
      cy.createBlog("third blog", "test author3", "test url3");

      cy.checkOrder(["second blog", "first blog", "third blog"]);

      cy.likeBlog("first blog");
      cy.checkOrder(["first blog", "second blog", "third blog"]);

      cy.likeBlog("second blog");
      cy.likeBlog("second blog");
      cy.checkOrder(["second blog", "first blog", "third blog"]);

      cy.likeBlog("third blog");
      cy.likeBlog("third blog");
      cy.likeBlog("third blog");
      cy.checkOrder(["third blog", "second blog", "first blog"]);
    });
  });
});
