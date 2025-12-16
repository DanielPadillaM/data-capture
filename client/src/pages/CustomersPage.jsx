import { useEffect, useState } from "react";

import { CustomerCard } from "../components/CustomerCard";
import { useCustomers } from "../hooks";

export const CustomersPage = () => {
  const { getCustomers, customers } = useCustomers();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await getCustomers();
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <h1>Loading customers...</h1>;

  if (customers.length === 0) return <h1>No Customers</h1>;

  return (
    <div className="container mx-auto py-10 px-7 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {customers.map((customer) => (
        <CustomerCard key={customer._id} customer={customer} />
      ))}
    </div>
  );
};
