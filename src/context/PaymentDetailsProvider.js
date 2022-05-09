import React from "react";
import { createContext, useState } from "react";

const defaultValue = {
  details: {},
  installments: {},
  addOns: {},
  setAddOn: () => {},
  setDetails: () => {},
  setInstallments: () => {},
  setCouponCode: () => {},
};

export const PaymentDetailsContext = createContext(defaultValue);

export const PaymentDetailsProvider = ({ children }) => {
  const [details, setDetails] = useState({
    case: "course" | "learning-path",
    price: 0,
    id: "",
    name: "",
    discount:"",
    couponcode: "",
  } );
  const [addOns, setAddOn] = useState( {
    internship: false,
    mentorship: false
  });
  const [installments, setInstallments] = useState({
    total: 0,
    interest: 0,
    valid: false
  });
  const setCouponCode = (couponcode) => {
    if (details) {
      setDetails({ ...details, couponcode });
    }
  };
  return (
    <PaymentDetailsContext.Provider
      value={{ 
        details, 
        installments, 
        addOns,
        setDetails, 
        setCouponCode, 
        setInstallments,
        setAddOn
      }}
    >
      {children}
    </PaymentDetailsContext.Provider>
  );
};
