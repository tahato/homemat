import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [billId, setBillId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [client, setClient] = useState("");
  const [conceptions, setConceptions] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        billId,
        setBillId,
        projectName,
        setProjectName,
        projectId,
        setProjectId,
        conceptions,
        setConceptions,
        client,
        setClient
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
