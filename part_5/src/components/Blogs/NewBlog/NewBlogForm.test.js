import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, prettyDOM } from "@testing-library/react";

import NewBlogForm from "./NewBlogForm";
import { act } from "react-dom/test-utils";

describe("NewBlogForm", () => {
  let newBlogMock;
  let component;

  beforeEach(() => {
    newBlogMock = jest.fn();
    act(() => {
      component = render(<NewBlogForm newBlog={newBlogMock} />);
    });
  });

  test("should call newBlog handler with new blog data", () => {
    const title = "test blog";
    const author = "test author";
    const url = "test_url";

    fillInput(component, "#title", title);
    fillInput(component, "#author", author);
    fillInput(component, "#blog-url", url);

    act(() => {
      fireEvent.submit(component.container.querySelector("form"));
    });

    expect(newBlogMock).toHaveBeenCalledWith({ title, author, url });
  });
});

function fillInput(component, selector, value) {
  const element = component.container.querySelector(selector);
  act(() => {
    fireEvent.change(element, { target: { value } });
  });
}
