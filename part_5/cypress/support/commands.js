Cypress.Commands.add("login", (login, password) => {
  cy.get("#login").type(login).should("have.value", login);
  cy.get("#password").type(password).should("have.value", password);
  return cy.get("#submit").click();
});

Cypress.Commands.add("logout", () => cy.get("#logout-button").click());

Cypress.Commands.add("createBlog", (title, author, url) => {
  cy.get("#show-create-blog").click();
  cy.get("#title").type(title);
  cy.get("#author").type(author);
  cy.get("#blog-url").type(url);
  return cy
    .get("#create-blog")
    .click()
    .then(() => {
      cy.get(".message.info").should(
        "contain",
        `${title} by ${author} was added`
      );
      cy.get("#cancel-create-blog").click();
    });
});

Cypress.Commands.add("countBlogs", (number) =>
  cy.get(".blogs").find(".blog").should("have.length", number)
);

Cypress.Commands.add("getBlog", (title) =>
  cy.get(".blog").contains(title).parents(".blog")
);

Cypress.Commands.add("toggleBlog", (title) =>
  cy.getBlog(title).find(".toggle-blog").click()
);

Cypress.Commands.add("likeBlog", (title) =>
  cy.toggleBlog(title).then(() => {
    cy.getBlog(title)
      .find(".like-blog")
      .click()
      .then(() => {
        cy.toggleBlog(title);
      });
  })
);

Cypress.Commands.add("deleteBlog", (title) =>
  cy
    .toggleBlog(title)
    .then(() => cy.getBlog(title).find(".delete-blog").click())
);

Cypress.Commands.add("checkOrder", (expectedOrder) =>
  cy.get(".blog-title").then((blogs) => {
    blogs.each(
      (index, blog) =>
        expect(blog.innerText === expectedOrder[index]).to.be.true
    );
  })
);
