import React, { createContext, useContext, useState } from "react";


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [token,setToken] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
      setToken,
      token,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
 
export default GlobalProvider;