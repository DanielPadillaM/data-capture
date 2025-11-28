import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/customers");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const result = await signup(data);
    if (!result.ok) return setLoading(false);
    navigate("/customers");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-sm p-10 rounded-md">
        {registerErrors.length > 0 &&
          registerErrors.map((error, i) => (
            <p key={i} className="bg-red-500 p-2 text-white">
              {error}
            </p>
          ))}
        <h1 className="text-2xl font-bold">Register</h1>
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {formErrors.username && (
            <p className="text-red-500">Username is required</p>
          )}
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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="flex gap-x-2">
          Already have an account?{" "}
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
