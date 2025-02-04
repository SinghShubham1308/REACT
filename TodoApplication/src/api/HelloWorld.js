import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:9090"
});
export const retreiveHello = () =>
  apiClient.get("/hello-world");

export const retreiveHelloWorldBean = () =>
  apiClient.get("/hello-world-bean");

export const retreiveHelloWorldPathVariable = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`);