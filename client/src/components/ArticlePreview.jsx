import { Link } from "react-router-dom";
import Button from "./Button";

const ArticlePreview = ({ article, onDelete }) => {
  const handleDelete = () => {
    onDelete(article._id);
  };

  return (
    <>
      <div>
        {article.title} - {article.author}
      </div>
      <div>{article.synopsis}</div>
      <Button onClick={handleDelete} danger>
        Delete
      </Button>
      <Link key={article.title} to={`/articles/${article._id}`}>
        <Button warning>Details</Button>
      </Link>
    </>
  );
};

export default ArticlePreview;
