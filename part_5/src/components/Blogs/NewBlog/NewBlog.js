import React from "react";

import Togglable from "../../shared";
import NewBlogForm from "./NewBlogForm";

export default ({ newBlog }) => {
  return (
    <Togglable actionTitle="Create New Blog" id="create-blog">
      <NewBlogForm newBlog={newBlog}></NewBlogForm>
    </Togglable>
  );
};
