function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  return blogs.reduce((acc, item) => acc + item.likes, 0);
}

function favoriteBlog(blogs) {
  return blogs.length
    ? blogs.reduce((acc, item) => (acc.likes < item.likes ? item : acc))
    : undefined;
}

function mostBlogs(blogs) {
  const blogCounter = {};
  let topBlogger = { blogs: 0 };

  for (let { author } of blogs) {
    if (author in blogCounter) {
      blogCounter[author] += 1;
    } else {
      blogCounter[author] = 1;
    }

    if (topBlogger.blogs < blogCounter[author]) {
      topBlogger = { author, blogs: blogCounter[author] };
    }
  }

  return topBlogger.blogs === 0 ? undefined : topBlogger;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
