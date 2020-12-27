import React, { useState } from "react";

export default ({ newBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function addNewBlog(e) {
    e.preventDefault();
    await newBlog({ title, author, url });
    [setTitle, setAuthor, setUrl].forEach((field) => field(""));
  }

  return (
    <form onSubmit={addNewBlog}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="blog-url">Url:</label>
        <input
          id="blog-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
      </div>
      <button id="create-blog" type="submit">
        Create
      </button>
    </form>
  );
};
