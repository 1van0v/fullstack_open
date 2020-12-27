import axios from "axios";
import authService from "./users";
const baseUrl = "/api/blogs/";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createBlog = (newBlog) => {
  return axios
    .post(baseUrl, newBlog, { transformRequest: [authService.addAuthHeader] })
    .then((response) => response.data);
};

const updateBlog = ({ id, user, ...updates }) => {
  return axios
    .put(baseUrl + id, updates, {
      transformRequest: [authService.addAuthHeader],
    })
    .then((response) => response.data);
};

const deleteBlog = ({ id }) => {
  return axios
    .delete(baseUrl + id, { transformRequest: [authService.addAuthHeader] })
    .then((response) => response.data);
};

export default { getAll, createBlog, updateBlog, deleteBlog };
