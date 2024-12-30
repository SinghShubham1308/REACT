import React from "react";
import { useContext } from "react";
import UserContext from "../Context/UserContext";

export const Profile = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <h2>please login</h2>;
  }
  return <div>Welcome {user.username}</div>;
};
