import { createContext, useState } from "react";
import {
  createCustomersRequest,
  deleteCustomerRequest,
  getCustomerRequest,
  getCustomersRequest,
  updateCustomerRequest,
} from "../api/customers";

export const CustomersContext = createContext();

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const getCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomersRequest();
      setCustomers(res.data);
      return { ok: true };
    } catch (error) {
      setErrors(error.response.data || "Error loading customers");
      return { ok: false };
    } finally {
      setLoading(false);
    }
  };

  const getCustomer = async (id) => {
    try {
      const res = await getCustomerRequest(id);
      return { ok: true, data: res.data };
    } catch (error) {
      setErrors(error.response.data || "Error getting customer");
      return { ok: false };
    }
  };

  const createCustomer = async (customer) => {
    try {
      await createCustomersRequest(customer);
      await getCustomers();
      return { ok: true };
    } catch (error) {
      console.error(error);
      setErrors(error.response.data || "Error creating customer");
      return { ok: false };
    }
  };

  const updateCustomer = async (id, customer) => {
    try {
      await updateCustomerRequest(id, customer);
      await getCustomers();
      return { ok: true };
    } catch (error) {

      setErrors(error.response.data || "Error updating customer");
      return { ok: false };
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await deleteCustomerRequest(id);
      setCustomers((prev) => prev.filter((customer) => customer._id !== id));
      return { ok: true };
    } catch (error) {
      setErrors(error.response.data || "Error deleting customer");
      return { ok: false };
    }
  };

  return (
    <CustomersContext.Provider
      value={{
        customers,
        loading,
        errors,
        getCustomers,
        getCustomer,
        createCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
