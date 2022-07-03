import { getCookie } from "../Utils/cookie";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ redirectTo, children }) => {
  const token = getCookie("token");
  return token ? children : <Navigate to={redirectTo} />;
};
export const PublicRoutes = ({ redirectTo, children }) => {
  const token = getCookie("token");
  return token ? <Navigate to={redirectTo} /> : children;
};
