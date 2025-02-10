import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:9090",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const addTodoApi = (username, todo) =>
  apiClient.post(`/user/${username}/todos`, todo, {
    headers: {
      Authorization: "Basic U2luZ2hTaHViaGFtMTMwODp0b2RvQXBw",
    },
  });

export const retreiveTodo = (username) =>
  apiClient.get(`/user/${username}/todos`, {
    headers: {
      Authorization: "Basic U2luZ2hTaHViaGFtMTMwODp0b2RvQXBw",
    },
  });

export const retreiveTodoWithId = (username, id) =>
  apiClient.get(`/user/${username}/todos/${id}`, {
    headers: {
      Authorization: "Basic U2luZ2hTaHViaGFtMTMwODp0b2RvQXBw",
    },
  });

export const deleteTodoById = (username, id) =>
  apiClient.delete(`/user/${username}/todos/${id}`, {
    headers: {
      Authorization: "Basic U2luZ2hTaHViaGFtMTMwODp0b2RvQXBw",
    },
  });

export const updateTodoById = (username, id, todo) =>
  apiClient.put(`/user/${username}/todos/${id}`, todo, {
    headers: {
      Authorization: "Basic U2luZ2hTaHViaGFtMTMwODp0b2RvQXBw",
    },
  });

export const retreiveHelloWorldPathVariable = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`, {
    headers: {
      Authorization: "Basic U2luZ2hTaHViaGFtMTMwODp0b2RvQXBw",
    },
  });

export const executeBasicAuthentication = (token) =>
  apiClient.get(`/hello-world/authentication`, {
    headers: {
      Authorization: token,
    },
  });
