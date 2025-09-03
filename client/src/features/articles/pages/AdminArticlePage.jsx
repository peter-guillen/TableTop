import { Link } from "react-router-dom";
import { AdminArticleList } from "../components/AdminArticleList";

export const AdminArticlePage = () => {
  return (
    <>
      <Link to="/articles/createArticle">
        <div className="text-center border rounded-md  p-2 m-4 w-1/4 hover:bg-slate-600">
          Create Article
        </div>
      </Link>
      <div>
        <AdminArticleList />
      </div>
    </>
  );
};
