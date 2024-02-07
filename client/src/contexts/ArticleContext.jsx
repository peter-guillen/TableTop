import { createContext, useState } from "react";

export const ArticleContext = createContext("");

export const ArticleContextProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  return (
    <ArticleContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticleContext.Provider>
  );
};
