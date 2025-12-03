
import { useEffect} from "react";
import {useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks";
import { AuthForm } from "../components/AuthForm";
import { formFields } from "./config";

export const AuthPage = () => {

  const { signup, signin, isAuthenticated, errors} = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const url = location.pathname

  


  useEffect(() => {
    if (isAuthenticated) navigate("/customers");
  }, [isAuthenticated]);



  return (
     <AuthForm
         title={url === "/register" ? "Register" : "Login"}
         fields={url === "/register" ? formFields.registerFields : formFields.loginFields}
         errors={errors}
         submitLabel={url === "/register" ? "Register" : "Login"}
         onSubmit={url === "/register" ? signup : signin}
         redirect={url === "/register" ? { text: "Already have an account?", linkText: "Login" } : { text: "Don't have an account?", linkText: "Sign up" }}
         redirectLink={url === "/register" ? "/login" : "/register"}
       />
  );
};
