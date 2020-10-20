const listHelper = require("../../utils/list_helpers");

const listWithOneBlog = [
  {
    likes: 5,
  },
];

const listWithTwoBlogs = [{ likes: 3 }, { likes: 5 }];

test("dummy returns one", () => {
  expect(listHelper.dummy([])).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const likes = listHelper.totalLikes(listWithOneBlog);
    expect(likes).toBe(5);
  });

  test("when list has no blogs, returns 0", () => {
    const likes = listHelper.totalLikes([]);
    expect(likes).toBe(0);
  });

  test("when list has several blogs, sums the likes", () => {
    const likes = listHelper.totalLikes(listWithTwoBlogs);
    expect(likes).toBe(8);
  });
});

describe("favoriteBlog", () => {
  test("when list has only one blog, equals it", () => {
    const favorite = listHelper.favoriteBlog(listWithOneBlog);
    expect(favorite).toEqual(listWithOneBlog[0]);
  });

  test("when list has no blogs, returns undefined", () => {
    const favorite = listHelper.favoriteBlog([]);
    expect(favorite).toBe(undefined);
  });

  test("when list has several blogs, returns top liked one", () => {
    const favorite = listHelper.favoriteBlog(listWithTwoBlogs);
    expect(favorite).toEqual(listWithTwoBlogs[1]);
  });
});
