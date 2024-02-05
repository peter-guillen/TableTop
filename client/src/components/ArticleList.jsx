import { Link } from "react-router-dom";
import ArticlePreview from "./ArticlePreview";
import Button from "./Button";

const ArticleList = ({ articleList, onDelete }) => {
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
