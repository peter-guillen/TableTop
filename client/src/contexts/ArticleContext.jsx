import { createContext, useState, useEffect } from "react";
import { fetchArticles } from "../api/articleApi";

export const ArticleContext = createContext();

export const ArticleContextProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await fetchArticles();
        setArticles(articles);
      } catch (error) {
        console.log("ERROR: Didn't get FETCH for CONTEXT.", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ArticleContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticleContext.Provider>
  );
};

// export { ArticleContextProvider };
export default ArticleContext;
