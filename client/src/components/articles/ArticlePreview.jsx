import { useContext } from "react";
import { Link } from "react-router-dom";

import { ArticleContext } from "../../hooks/articleFastRefreshHook";
import { Button } from "../Button";

export const ArticlePreview = ({ article }) => {
  const { handleDelete } = useContext(ArticleContext);
  const deleteArticleOnClick = () => {
    handleDelete(article._id);
  };

  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-600 p-4 m-4 text-center w-4/5">
        <h3 className="text-2xl font-bold p-2">{article.title}</h3>
        <p className="p-2">{article.synopsis}</p>
        <p className="p-2 pb-4">
          Written by <strong>{article.author}</strong>
        </p>
        <Button onClick={deleteArticleOnClick} danger>
          Delete
        </Button>
        <Link key={article.title} to={`/articles/${article._id}`}>
          <Button warning>Details</Button>
        </Link>
      </div>
    </>
  );
};
