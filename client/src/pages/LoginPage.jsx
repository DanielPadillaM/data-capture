import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks";
import { AuthForm } from "../components/AuthForm";

export const LoginPage = () => {
  const { signin, isAuthenticated, errors } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) navigate("/customers");
  }, [isAuthenticated]);

  return (
    <AuthForm
      title={"Login"}
      fields={[
        { 
          name: "email",
          type: "email", 
          placeholder: "Email", 
          required: true 
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          required: true,
        },
      ]}
      errors={errors}
      submitLabel="Login"
      onSubmit={signin}
      redirect={{ text: "Don't have an account?", linkText: "Sign up" }}
      redirectLink="/register"
    />
  );
};
