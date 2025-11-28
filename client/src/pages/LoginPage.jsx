import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/customers");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const result = await signin(data);
    if (!result.ok) {
      setLoading(false);
      return;
    }
    navigate("/customers");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-sm p-10 rounded-md">
        {loginErrors.length > 0 &&
          loginErrors.map((error, i) => (
            <p key={i} className="bg-red-500 p-2 text-white">
              {error}
            </p>
          ))}
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {formErrors.email && (
            <p className="text-red-500">Email is required</p>
          )}
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {formErrors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            className="bg-indigo-500 px-4 py-1 rounded-sm my-2 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in.." : "Login"}
          </button>
        </form>
        <p className="flex gap-x-2 ">
          Don't have an account?{" "}
          <Link className="text-sky-500" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
