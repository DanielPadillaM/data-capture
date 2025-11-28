import { useContext } from "react";
import { CustomersContext } from "../context";

export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (!context)
    throw new Error("use Customers must be used within CustomersProvider");
  return context;
};
