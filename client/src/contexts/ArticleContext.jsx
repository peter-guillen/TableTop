import { createContext } from "react";

export const ArticleContext = createContext("");

export const ArticleContextProvider = ({ children }) => {
  return (
    <ArticleContext.Provider value={{}}>{children}</ArticleContext.Provider>
  );
};
