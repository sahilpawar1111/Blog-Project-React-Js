const BASE_URL = "http://localhost:3000";

const request = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.status === 204 ? null : res.json();
};

export const getBlogs = () => request("/blogs");

export const getBlog = (id) => request(`/blogs/${id}`);

export const createBlog = (blog) =>
  request("/blogs", {
    method: "POST",
    body: JSON.stringify(blog),
  });

export const updateBlog = (id, blog) =>
  request(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(blog),
  });

export const deleteBlog = (id) =>
  request(`/blogs/${id}`, {
    method: "DELETE",
  });

export const getUsers = () => request("/users");

export const createUser = (user) =>
  request("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

export const updateUser = (id, user) =>
  request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

export const deleteUser = (id) =>
  request(`/users/${id}`, {
    method: "DELETE",
  });