import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ArticleContext } from "../context/ArticleContext";

import { NotFound } from "../../../app/pages/NotFound";
import { Button } from "../../../shared/components/Button";

import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const ArticleDetails = () => {
  const { articleList } = useContext(ArticleContext);
  const { id } = useParams();
  const article = articleList.find((a) => a._id === id);
  if (!article) {
    return <NotFound />;
  }

  const container = twMerge(classNames("p-5 m-5 border-2 rounded-md w-3/4"));

  const containerHeading = twMerge(
    classNames("text-white text-4xl rounded-md text-center")
  );

  return (
    <>
      <div className="grid place-items-center">
        <div className={container}>
          <div className={containerHeading}>{article.title}</div>
          <div className="p-4 m-2">{article.body}</div>
          <div>
            <strong>Written by: </strong>
            {article.author}
          </div>
          <div>
            <strong>Synopsis: </strong>
            {article.synopsis}
          </div>
        </div>
      </div>
      <Link to="/articles" className="grid place-items-center">
        <Button primary className="w-1/4">
          Back
        </Button>
      </Link>
    </>
  );
};
