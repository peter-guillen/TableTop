import { useContext } from "react";
import { Link } from "react-router-dom";

import ArticleContext from "../../hooks/articleFastRefreshHook";
import Button from "../Button";

const ArticlePreview = ({ article }) => {
  const { handleDelete } = useContext(ArticleContext);
  const deleteArticleOnClick = () => {
    handleDelete(article._id);
  };

  return (
    <>
      <div>
        {article.title} - {article.author}
      </div>
      <div>{article.synopsis}</div>
      <Button onClick={deleteArticleOnClick} danger>
        Delete
      </Button>
      <Link key={article.title} to={`/articles/${article._id}`}>
        <Button warning>Details</Button>
      </Link>
    </>
  );
};

export default ArticlePreview;
