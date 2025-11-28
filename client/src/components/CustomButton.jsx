import { useState } from "react";

export const CustumButton = ({ children, onClick, ...props }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await onClick();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading} {...props}>
      {loading ? "Sending" : children}
    </button>
  );
};
