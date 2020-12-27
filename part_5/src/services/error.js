export default function (res, isError = false) {
  return {
    message:
      res.response.data.error ||
      "Something unexpected has happened. Please try again later",
    isError,
  };
}
