import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import Blog from "./Blog";

describe("Blog", () => {
  const blog = {
    title: "Test blog",
    likes: 1,
    author: "test author",
    url: "test_url",
  };

  let updateBlogMock;
  let component;

  beforeEach(() => {
    updateBlogMock = jest.fn();

    component = render(
      <Blog
        blog={blog}
        updateBlog={updateBlogMock}
        deleteBlog={() => {}}
        isAuthor={false}
      />
    );
  });

  test("should render blog title", () => {
    expect(component.container).toHaveTextContent(blog.title);
  });

  test("should contain view button", () => {
    const button = component.container.querySelector("button");
    expect(button).toHaveTextContent("view");
  });

  test("should not contain author, likes and url", () => {
    expect(component.container).not.toHaveTextContent("likes");
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.author);
  });

  describe("open blog", () => {
    beforeEach(() => {
      fireEvent.click(component.container.querySelector("button"));
    });

    test("should show additional info after clicking on view button", () => {
      expect(component.container).toHaveTextContent("likes");
      expect(component.container).toHaveTextContent(blog.url);
      expect(component.container).toHaveTextContent(blog.author);
      expect(component.container.querySelector("button")).toHaveTextContent(
        "hide"
      );
    });

    test("should call updateBlog handler for each click on like blog button", () => {
      const likeButton = component.container.querySelector("#like-blog");
      fireEvent.click(likeButton);
      expect(updateBlogMock).toHaveBeenCalled();

      fireEvent.click(likeButton);
      expect(updateBlogMock).toHaveBeenCalledTimes(2);
    });
  });
});
