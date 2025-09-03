import { useContext } from "react";
import { Link } from "react-router-dom";

import { ArticleContext } from "../context/ArticleContext";
import { Button } from "../../../shared/components/Button";

export const ArticleCard = () => {
  const { articleList } = useContext(ArticleContext);
  console.log(articleList);

  return (
    <>
      {articleList.map((article) => (
        <div key={article._id}>
          <div className="bg-gray-200 dark:bg-gray-600 p-4 m-4 text-center border rounded-md">
            <h3 className="text-2xl font-bold p-2">{article.title}</h3>
            <p className="p-2">{article.synopsis}</p>
            <p className="p-2 pb-4">
              Written by <strong>{article.author}</strong>
            </p>
            <Link key={article.title} to={`/articles/${article._id}`}>
              <Button className="w-1/2" primary>
                Read More
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
