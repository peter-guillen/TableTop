import { createContext, useState, useEffect } from "react";
import {
  fetchArticles,
  createArticle as apiCreateArticle,
  updateArticle as apiUpdateArticle,
  deleteArticle as apiDeleteArticle,
} from "../api/articleApi";

export const ArticleContext = createContext();

export const ArticleContextProvider = ({ children }) => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const articles = await fetchArticles();
      setArticleList(articles);
    };
    fetchData();
  }, []);

  const createArticle = async (formData) => {
    const newArticle = await apiCreateArticle(formData);
    setArticleList([...articleList, newArticle]);
  };

  const updateArticle = async (id, formData) => {
    await apiUpdateArticle(id, formData);
    const updatedArticleList = articleList.map((article) =>
      article._id === id ? { ...article, ...formData } : article
    );
    setArticleList(updatedArticleList);
  };

  const deleteArticle = async (id) => {
    await apiDeleteArticle(id);
    const updatedArticleList = articleList.filter(
      (article) => article._id !== id
    );
    setArticleList(updatedArticleList);
  };
  const articleContextData = {
    articleList,
    createArticle,
    updateArticle,
    deleteArticle,
  };

  return (
    <ArticleContext.Provider value={articleContextData}>
      {children}
    </ArticleContext.Provider>
  );
};
