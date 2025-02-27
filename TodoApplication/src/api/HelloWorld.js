import { apiClient } from "./apiClient";

export const retreiveHello = () => apiClientlient.get("/hello-world");

export const retreiveHelloWorldBean = () => apiClient.get("/hello-world-bean");

export const retreiveHelloWorldPathVariable = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`);
