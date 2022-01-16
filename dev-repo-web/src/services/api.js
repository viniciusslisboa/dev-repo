import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const createSession = async (email, password) => {
  const url = "/sessions";
  const response = await api.post(url, { email, password });

  return response;
};

export const getRepositories = async (userId, query) => {
  let url = `/users/${userId}/repositories/`;

  if (query !== "") {
    url += `?q=${query}`;
  }

  const response = await api.get(url);

  return response;
};

export const createRepository = async (userId, repoUrl) => {
  const repoName = getRepositoryName(repoUrl);
  const url = `/users/${userId}/repositories/`;

  const response = await api.post(url, {
    name: repoName,
    url: repoUrl,
  });

  return response;
};

export const destroyRepository = async (userId, id) => {
  const url = `/users/${userId}/repositories/${id}`;
  await api.delete(url);
};

const getRepositoryName = (url) => {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)/;

  const match = url.match(regex);

  if (match[2]) {
    const values = match[2].split("/");
    return `${values[1]}/${values[2]}`;
  }
};
