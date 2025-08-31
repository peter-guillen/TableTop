import { Route, Routes } from "react-router-dom";

import { AdminArticleList } from "../admin/AdminArticleList";
import { ArticleDetails } from "../components/ArticleDetails";
import { ArticleList } from "../components/ArticleList";
import { AdminArticleCreate } from "../admin/AdminArticleCreate";
import { AdminArticleEdit } from "../admin/AdminArticleEdit";

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
