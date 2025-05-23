import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { token, user } = useContext(AuthContext);

 return token && user?.role === "admin" ? children : <Navigate to="/login" />;


//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return user?.role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;