import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks";
import { AuthForm } from "../components/AuthForm";
import { formFields } from "./config";

export const AuthPage = () => {
  const { signup, signin, isAuthenticated, errors } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const isRegister = pathname === "/register";

  const pageConfig = useMemo(
    () => ({
      title: isRegister ? "Register" : "Login",
      fields: isRegister ? formFields.registerFields : formFields.loginFields,
      submitLabel: isRegister ? "Register" : "Login",
      onSubmit: isRegister ? signup : signin,
      redirect: isRegister
        ? { text: "Already have an account?", linkText: "Login", to: "/login" }
        : {
            text: "Don't have an account?",
            linkText: "Sign up",
            to: "/register",
          },
    }),
    [isRegister, signup, signin]
  );

  useEffect(() => {
    if (isAuthenticated) navigate("/customers");
  }, [isAuthenticated]);

  return (
    <AuthForm
      title={pageConfig.title}
      fields={pageConfig.fields}
      errors={errors}
      submitLabel={pageConfig.submitLabel}
      onSubmit={pageConfig.onSubmit}
      redirect={pageConfig.redirect}
    />
  );
};
