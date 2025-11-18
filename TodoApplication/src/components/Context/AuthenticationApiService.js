import { apiClient } from "../../api/apiClient";

export const executeBasicAuthentication = (token) =>
  apiClient.get(`/hello-world/authentication`, {
    headers: {
      Authorization: token
    }
  });

  export const executeJwtAuthentication = (username,password) =>
  apiClient.post(`/authenticate`, 
   {username,password
  });