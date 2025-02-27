import { apiClient } from "../../api/apiClient";

export const executeBasicAuthentication = (token) =>
  apiClient.get(`/hello-world/authentication`, {
    headers: {
      Authorization: token
    }
  });

  export const executeJwtAuthentication = (username,passeord) =>
  apiClient.post(`/authentication`, 
   {username,passeord
  });