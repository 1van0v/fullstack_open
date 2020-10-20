const listHelper = require("../../utils/list_helper");

test("dummy returns one", () => {
  expect(listHelper.dummy([])).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const listWithOneBlog = [
      {
        likes: 5,
      },
    ];

    const likes = listHelper.totalLikes(listWithOneBlog);
    expect(likes).toBe(5);
  });

  test("when list has no blogs, returns 0", () => {
    const likes = listHelper.totalLikes([]);
    expect(likes).toBe(0);
  });

  test("when list has several blogs, sums the likes", () => {
    const blogs = [{ likes: 3 }, { likes: 5 }];

    const likes = listHelper.totalLikes(blogs);
    expect(likes).toBe(8);
  });
});
