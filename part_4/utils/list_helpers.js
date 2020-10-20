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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
