import { Link } from "react-router-dom";

import ArticlePreview from "./ArticlePreview";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";

const ArticleList = ({ articleList, onDelete }) => {
  if (!articleList || articleList.length === 0) {
    return <LoadingSpinner />;
  }
  const renderedArticle = articleList.map((article) => (
    <ArticlePreview key={article._id} article={article} onDelete={onDelete} />
  ));

  return (
    <div className="place-content-center">
      <Link to="/articles/createArticle">
        <Button primary>New Article</Button>
      </Link>
      <div className="bg-gray-300">{renderedArticle}</div>
    </div>
  );
};

export default ArticleList;
