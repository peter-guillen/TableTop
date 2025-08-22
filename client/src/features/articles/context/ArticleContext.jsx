import { useState, useEffect } from "react";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../api/articleApi";
import { ArticleContext } from "../hooks/articleFastRefreshHook";

export const ArticleContextProvider = ({ children }) => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const articles = await fetchArticles();
      setArticleList(articles);
    };
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    const newArticle = await createArticle(formData);
    setArticleList([...articleList, newArticle]);
  };

  const handleDelete = async (id) => {
    await deleteArticle(id);
    const updatedArticleList = articleList.filter(
      (article) => article._id !== id
    );
    setArticleList(updatedArticleList);
  };

  const handleEdit = async (id, formData) => {
    await updateArticle(id, formData);
    const updatedArticleList = articleList.map((article) =>
      article._id === id ? { ...article, ...formData } : article
    );
    setArticleList(updatedArticleList);
  };

  const articleContextData = {
    articleList,
    handleCreate,
    handleDelete,
    handleEdit,
  };

  return (
    <ArticleContext.Provider value={articleContextData}>
      {children}
    </ArticleContext.Provider>
  );
};
