import { Link } from "react-router-dom";

import { ArticlePreview } from "./ArticlePreview";
import { Button } from "../../../shared/components/Button";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";

export const ArticleList = ({ articleList }) => {
  if (!articleList || articleList.length === 0) {
    return <LoadingSpinner />;
  }
  const renderedArticle = articleList.map((article) => (
    <ArticlePreview key={article._id} article={article} />
  ));

  return (
    <div className="place-content-center">
      <Link to="/articles/createArticle">
        <Button primary>New Article</Button>
      </Link>
      <div className="p-2 m-2 flex flex-col justify-center items-center">
        {renderedArticle}
      </div>
    </div>
  );
};
