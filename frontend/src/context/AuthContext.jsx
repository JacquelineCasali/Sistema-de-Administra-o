import { createContext, useEffect, useState } from "react";

import api from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext({});
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post("/login", { email, password });
      setUser(res.data.users);
      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.users));
      localStorage.setItem("token", res.data.token);
      api.defaults.headers.Authorization = `Bearer ${res.data.token}`;

      console.log("login", res.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.error("Login error:", err);
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;

    setUser(null);
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
