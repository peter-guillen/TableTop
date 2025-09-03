import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { Button } from "../../../shared/components/Button";
import { FaCircleXmark } from "react-icons/fa6";

export const AdminArticleList = () => {
  const { articleList, handleDelete } = useContext(ArticleContext);
  if (!articleList || articleList.length === 0) {
    return <LoadingSpinner />;
  }

  const articles = articleList.map((article) => (
    <tbody key={article._id}>
      <tr className="hover:bg-gray-300 dark:hover:bg-gray-600">
        <td>{article.title}</td>
        <td>{article.author}</td>
        <td>
          <Link to={`/articles/${article._id}`}>Details</Link>
        </td>
        <td>
          <Link to={`/articles/${article._id}/edit`}>Edit</Link>
        </td>
        <td>
          <Button onClick={() => handleDelete(article._id)}>
            <FaCircleXmark />
          </Button>
        </td>
      </tr>
    </tbody>
  ));

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300 dark:bg-gray-700 border-b">
            <th>Title</th>
            <th>Author</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {articles}
      </table>
    </>
  );
};
