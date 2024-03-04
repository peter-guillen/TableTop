import { Link } from "react-router-dom";
import ArticlePreview from "./ArticlePreview";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";

const ArticleList = ({ articleList, onDelete }) => {
  if (!articleList || articleList.length === 0) {
    return <LoadingSpinner />;
  }
  const renderedArticle = articleList.map((article) => (
    // <div key={article._id}>
    <ArticlePreview key={article._id} article={article} onDelete={onDelete} />
    // </div>
  ));

  return (
    <>
      {/* <div>
        {articleList.map((article) => (
          <div key={article._id}>
          <ArticlePreview article={article} onDelete={onDelete} />
          </div>
          ))}
        </div> */}
      {renderedArticle}

      <Link to="/articles/createArticle">
        <Button primary>New Article</Button>
      </Link>
    </>
  );
};

export default ArticleList;
