import React from "react";
import Blog from "./Blog";
import User from "../User";
import NewBlog from "./NewBlog";

export default ({ blogs, user, doLogout, addBlog, updateBlog, deleteBlog }) => {
  function isAuthor(blog, user) {
    return user.id === blog.user.id;
  }

  return (
    <div className="blogs">
      <h2>blogs</h2>
      <User username={user.username} doLogout={doLogout} />
      <NewBlog newBlog={addBlog} />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          isAuthor={isAuthor(blog, user)}
        />
      ))}
    </div>
  );
};
