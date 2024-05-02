import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const ProtectedRoute = ({ children, ...rest }) => { 
  let auth = cookies.get("isLoggedIn");
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default ProtectedRoute;
