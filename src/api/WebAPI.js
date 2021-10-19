import { getAuthToken } from "../utils";

const BASE_API = "https://student-json-api.lidemy.me";
const PAGE_LIMIT = 9;

export const getArticles = async (page) => {
  return await fetch(
    `${BASE_API}/posts?&_page=${page}&_limit=${PAGE_LIMIT}&_expand=user&_sort=id&_order=desc`
  ).then((res) => res.json());
};

export const getAllArticles = async () => {
  return await fetch(
    `${BASE_API}/posts?&_expand=user&_sort=id&_order=desc`
  ).then((res) => res.json());
};

export const getArticle = async (id) => {
  return await fetch(`${BASE_API}/posts?id=${id}`).then((res) => res.json());
};

export const login = async (username, password) => {
  return await fetch(`${BASE_API}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const register = async (nickname, username, password) => {
  return await fetch(`${BASE_API}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = async () => {
  const token = getAuthToken();
  return await fetch(`${BASE_API}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const newPost = async (title, body) => {
  const token = getAuthToken();
  return await fetch(`${BASE_API}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};
