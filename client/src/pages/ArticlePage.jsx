import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import ArticleContext from "../hooks/articleFastRefreshHook";
import ArticleDetails from "../components/articles/ArticleDetails";
import ArticleList from "../components/articles/ArticleList";
import ArticleCreate from "../components/articles/ArticleCreate";
import ArticleEdit from "../components/articles/ArticleEdit";

import Button from "../components/Button";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const ArticlePage = () => {
  const { articleList, handleCreate, handleDelete, handleEdit } =
    useContext(ArticleContext);

  return (
    <>
      <div className="p-5 m-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A eius omnis
        inventore numquam ex est quasi temporibus aperiam minus vitae?
        Laboriosam animi iure molestias repudiandae doloribus ipsum recusandae
        odit incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Totam, quod! Necessitatibus sapiente modi dolorum, ex sequi fuga quo
        itaque quae, corporis consequuntur illo error aliquam ad enim eius
        quidem corrupti.
      </div>
      <Routes>
        <Route path="/" element={<ArticleList articleList={articleList} />} />
        <Route path="/createArticle" element={<ArticleCreate />} />
        <Route
          path="/:id"
          element={<ArticleDetails articleList={articleList} />}
        />
        <Route
          path="/:id/edit"
          element={<ArticleEdit articleList={articleList} />}
        />
      </Routes>
    </>
  );
};

export default ArticlePage;
