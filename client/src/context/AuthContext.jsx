import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      localStorage.setItem("token", res.data.accesToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem("token", res.data.accesToken);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setIsAuthenticated(true);
      setErrors([]);
      return { ok: true };
    } catch (error) {
      setErrors(error.response?.data || "Error registering");
      return { ok: false };
    }
  };
  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      localStorage.setItem("token", res.data.accesToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem("token", res.data.accesToken);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setIsAuthenticated(true);
      setErrors([]);
      return { ok: true };
    } catch (error) {
      setErrors(error.response?.data || "Login failed");
      return { ok: false };
    }
  };
  const logout = async () => {
    try {
      await logoutRequest();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      return { ok: true };
    } catch (error) {
      setErrors(error.response?.data || "Logout failed");
      return { ok: false };
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest(); // el servidor leerá la cookie httpOnly si existe
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");
        const localUser = localStorage.getItem("user");
        const sessionUser = sessionStorage.getItem("user");

        if (res?.data?.user) {
          // autenticación por cookie (preferible)
          setIsAuthenticated(true);
          setUser(res.data.user);
        } else if (localToken || sessionToken) {
          // no vino res.data (cookie ausente) pero hay token en storage => restaurar user sin crash
          try {
            const parsedUser = localUser
              ? JSON.parse(localUser)
              : sessionUser
              ? JSON.parse(sessionUser)
              : null;
            setIsAuthenticated(true);
            setUser(parsedUser);
          } catch (e) {
            // parsing falló: limpiar storage y desloguear
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        // Si verify falla y no hay token en storage => desloguear
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
