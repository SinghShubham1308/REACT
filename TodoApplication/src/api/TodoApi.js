import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:9090",
});
export const retreiveTodo = (username) =>
  apiClient.get(`/user/${username}/todos`);

export const retreiveTodoWithId = (username,id) =>
  apiClient.get(`/user/${username}/todos/${id}`);

export const deleteTodoById = (username, id) =>
  apiClient.delete(`/user/${username}/todos/${id}`);

export const updateTodoById = (username, id,todo) =>
  apiClient.put(`/user/${username}/todos/${id}`,todo);

export const retreiveHelloWorldPathVariable = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`);
