import authService from "../../../actions/services/auth.service";
import { UserContext } from "../../../context/UserProvider";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

export const Logout = (props) => {
  const { setUser } = useContext(UserContext);
  authService.logout();
  setUser(null);
  return <Navigate to="/" />;
};
