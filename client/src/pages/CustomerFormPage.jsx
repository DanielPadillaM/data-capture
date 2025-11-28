import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useCustomers } from "../hooks";

export const CustomerFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createCustomer, getCustomer, updateCustomer } = useCustomers();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);

    async function loadCustomer() {
      if (params.id) {
        const { data } = await getCustomer(params.id);

        setValue("name", data.name);
        setValue("email", data.email);
        setValue("number", data.number);
      }
    }
    loadCustomer();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    if (params.id) {
      await updateCustomer(params.id, data);
    } else {
      await createCustomer(data);
    }
    setLoading(false);
    navigate("/customers");
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="text"
          placeholder="Name"
          autoFocus
          {...register("name", { required: true })}
        />
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my2"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="text"
          placeholder="Number"
          {...register("number", { required: true })}
        />
        <button disabled={loading}>{loading ? "Sending.." : "Send"}</button>
      </form>
    </div>
  );
};
