import { Route, Routes } from "react-router-dom";

import { AdminArticleList } from "../components/AdminArticleList";
import { ArticleDetails } from "../components/ArticleDetails";
import { ArticleList } from "../components/ArticleList";
import { AdminArticleCreate } from "./AdminArticleCreate";
import { AdminArticleEdit } from "./AdminArticleEdit";

export const ArticlePage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/adminArticleList" element={<AdminArticleList />} />
        <Route path="/createArticle" element={<AdminArticleCreate />} />
        <Route path="/:id" element={<ArticleDetails />} />
        <Route path="/:id/edit" element={<AdminArticleEdit />} />
      </Routes>
    </>
  );
};
