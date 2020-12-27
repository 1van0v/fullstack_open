import React, { useState } from "react";
import PropTypes from "prop-types";

const blogStyle = {
  padding: 10,
  borderRadius: 10,
  borderStyle: "solid",
  borderWidth: 1,
  margin: "5px 0",
};

const Blog = ({ blog, updateBlog, deleteBlog, isAuthor }) => {
  const [visible, setVisible] = useState(false);
  const buttonName = visible ? "hide" : "view";

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(updatedBlog);
  };

  const initDeletion = () => {
    const isConfirmed = window.confirm(
      `You are going to delete "${blog.title}" by ${blog.author}`
    );

    if (isConfirmed) {
      deleteBlog(blog);
    }
  };

  const blogDetails = visible && (
    <div>
      <div>{blog.url}</div>
      <div>
        likes <span className="like-counter">{blog.likes}</span>
        <button className="like-blog" onClick={likeBlog}>
          like
        </button>
      </div>
      <div>{blog.author}</div>
      {isAuthor && (
        <button className="delete-blog" onClick={initDeletion}>
          Delete
        </button>
      )}
    </div>
  );

  return (
    <div style={blogStyle} className="blog">
      <div>
        <div className="control-bar">
          <span className="blog-title">{blog.title}</span>
          <button className="toggle-blog" onClick={() => setVisible(!visible)}>
            {buttonName}
          </button>
        </div>
        {blogDetails}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  isAuthor: PropTypes.bool.isRequired,
};

export default Blog;
