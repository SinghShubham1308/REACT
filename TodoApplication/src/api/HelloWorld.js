import axios from "axios";

export const retreiveHello = () =>
  axios.get("http://localhost:9090/hello-world");

export const retreiveHelloWorldBean = () =>
  axios.get("http://localhost:9090/hello-world-bean");

export const retreiveHelloWorldPathVariable = () =>
  axios.get("http://localhost:9090/hello-world/path-variable/Shubham");