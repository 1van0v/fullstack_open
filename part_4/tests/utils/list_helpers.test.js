const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
} = require("../../utils/list_helpers");

const listWithOneBlog = [
  {
    likes: 5,
    author: "Edsger W. Dijkstra",
  },
];

const listWithSeveralBlogs = [
  { likes: 3, author: "Robert C. Marti" },
  { likes: 5, author: "Edsger W. Dijkstra" },
  { likes: 4, author: "Robert C. Marti" },
];

test("dummy returns one", () => {
  expect(dummy([])).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const likes = totalLikes(listWithOneBlog);
    expect(likes).toBe(5);
  });

  test("when list has no blogs, returns 0", () => {
    const likes = totalLikes([]);
    expect(likes).toBe(0);
  });

  test("when list has several blogs, sums the likes", () => {
    const likes = totalLikes(listWithSeveralBlogs);
    expect(likes).toBe(12);
  });
});

describe("favoriteBlog", () => {
  test("when list has only one blog, equals it", () => {
    const favorite = favoriteBlog(listWithOneBlog);
    expect(favorite).toEqual(listWithOneBlog[0]);
  });

  test("when list has no blogs, returns undefined", () => {
    const favorite = favoriteBlog([]);
    expect(favorite).toBe(undefined);
  });

  test("when list has several blogs, returns top liked one", () => {
    const favorite = favoriteBlog(listWithSeveralBlogs);
    expect(favorite).toEqual(listWithSeveralBlogs[1]);
  });
});

describe("mostBlogs", () => {
  test("when list has only one blog, equals it", () => {
    const mostBlogger = mostBlogs(listWithOneBlog);
    expect(mostBlogger).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
  });

  test("when list has several blogs, returns blogger with most blogs", () => {
    const mostBlogger = mostBlogs(listWithSeveralBlogs);
    expect(mostBlogger).toEqual({ author: "Robert C. Marti", blogs: 2 });
  });

  test("when list has no blogs, returns undefined", () => {
    const mostBlogger = mostBlogs([]);
    expect(mostBlogger).toBe(undefined);
  });
});
