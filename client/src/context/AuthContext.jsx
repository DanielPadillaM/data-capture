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

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      localStorage.setItem("token", res.data.accesToken);
      sessionStorage.setItem("token", res.data.accesToken);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setErrors([]);
      return { ok: true };
    } catch (error) {
      setErrors(error.response.data || "Error registering");
      return { ok: false };
    }
  };
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      localStorage.setItem("token", res.data.accesToken);
      sessionStorage.setItem("token", res.data.accesToken);
      setUser(res.data.user);
      console.log(res.data.user);
      setIsAuthenticated(true);
      setErrors([]);
      return { ok: true };
    } catch (error) {
      setErrors(error.response.data || "Login failed");
      return { ok: false };
    }
  };
  const logout = async () => {
    try {
      await logoutRequest();
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      return { ok: true };
    } catch (error) {
      setErrors(error.response.data || "Logout failed");
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
        const res = await verifyTokenRequest();
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");
        if (!res.data || !localToken || !sessionToken) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
      } finally{
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
