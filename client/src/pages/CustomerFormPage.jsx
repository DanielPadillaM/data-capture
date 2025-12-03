import { useNavigate, useParams } from "react-router";

import { useCustomers } from "../hooks";
import { AuthForm } from "../components/AuthForm";
import { formFields } from "./config";

export const CustomerFormPage = () => {
  const { createCustomer, updateCustomer, errors } = useCustomers();
  const navigate = useNavigate();
  const params = useParams();
  

  const onSubmit = async (data) => {
    if (params.id) {
      const res = await updateCustomer(params.id, data);
      navigate("/customers");
      return res;
    } else {
      const res = await createCustomer(data);
      navigate("/customers");
      return res;
    }
  };

  return (
    <AuthForm
      title={"Add Data"}
      fields={formFields.customerFields}
      errors={errors}
      submitLabel={"Add"}
      onSubmit={onSubmit}
    />
  );
};
