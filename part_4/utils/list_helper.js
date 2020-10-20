function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  return blogs.reduce((acc, item) => acc + item.likes, 0);
}

module.exports = {
  dummy,
  totalLikes,
};
