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

function mostLikes(blogs) {
  const likeCounter = {};
  let topBlogger = { likes: 0 };

  for (let { author, likes } of blogs) {
    if (author in likeCounter) {
      likeCounter[author] += likes;
    } else {
      likeCounter[author] = likes;
    }

    if (topBlogger.likes < likeCounter[author]) {
      topBlogger = { author, likes: likeCounter[author] };
    }
  }

  return topBlogger.likes === 0 ? undefined : topBlogger;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
