import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Message from "./components/Message";
import blogService from "./services/blogs";
import userService from "./services/users";
import createMessage from "./services/error";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [message, setMessage] = useState();

  const login = async (username, password) => {
    try {
      const user = await userService.login(username, password);
      setUser(user);
    } catch (e) {
      setMessage(createMessage(e, true));
    }
  };

  if (!user) {
    userService.checkLocalStorage(setUser);
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    blogService
      .getAll()
      .then((blogs) => updateBlogs(blogs || []))
      .catch((e) => setMessage(createMessage(e, true)));
  }, [user]);

  function updateBlogs(list) {
    setBlogs(list.sort((a, b) => b.likes - a.likes));
  }

  function logOut() {
    setUser(null);
    userService.logOut();
  }

  async function addBlog(blog) {
    try {
      const createdBlog = await blogService.createBlog(blog);
      updateBlogs([...blogs, createdBlog]);
      setMessage({
        message: `${createdBlog.title} by ${createdBlog.author} was added`,
      });
    } catch (e) {
      setMessage(createMessage(e, true));
    }
  }

  async function updateBlog(blog) {
    try {
      const updatedBlog = await blogService.updateBlog(blog);
      updateBlogs(blogs.filter((i) => i.id !== blog.id).concat(updatedBlog));
      setMessage({
        message: `Liked ${updatedBlog.title} by ${updatedBlog.author}`,
      });
    } catch (e) {
      setMessage(createMessage(e, true));
    }
  }

  async function deleteBlog(blog) {
    try {
      await blogService.deleteBlog(blog);
      updateBlogs(blogs.filter((i) => i.id !== blog.id));
      setMessage({
        message: `Deleted ${blog.title} by ${blog.author}`,
      });
    } catch (e) {
      setMessage(createMessage(e, true));
    }
  }

  const mainComponent = user ? (
    <Blogs
      blogs={blogs}
      doLogout={logOut}
      addBlog={addBlog}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog}
      user={user}
    />
  ) : (
    <Login doLogin={login} />
  );

  return (
    <div>
      {message && <Message message={message} setMessage={setMessage} />}
      {mainComponent}
    </div>
  );
};

export default App;
