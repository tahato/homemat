import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [billId, setBillId] = useState(null);
  const [projectName, setProjectName] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        billId,
        setBillId,
        projectName,
        setProjectName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
