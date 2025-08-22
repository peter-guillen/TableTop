import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { NotFound } from "../../../app/pages/NotFound";
import { Button } from "../../../shared/components/Button";

import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const ArticleDetails = ({ articleList }) => {
  // const [hoveredArticleId, setHoveredArticleId] = useState(null);
  const { id } = useParams();
  const article = articleList.find((a) => a._id === id);
  if (!article) {
    return <NotFound />;
  }

  const newsFeedContainerStyles = twMerge(
    classNames("p-5 m-5 border-2 rounded-md grid grid-cols-3 gap-4")
  );

  const newsFeedItemStyles = twMerge(
    classNames(
      "text-white border-2 rounded-md bg-indigo-800 h-40 text-center",
      {
        // "bg-indigo-400": hoveredArticleId === articleId,
      }
    )
  );

  // const handleMouseEnter = (articleId) => {
  //   setHoveredArticleId(articleId);
  // };
  // const handleMouseLeave = () => {
  //   setHoveredArticleId(null);
  // };

  // const renderedArticle = articleList.map((article) => {
  //   const articleDate = new Date(article.createdAt);
  //   const month = articleDate.getMonth();
  //   const year = articleDate.getFullYear();
  //   return (
  //     <div
  //       key={article._id}
  //       onMouseEnter={() => handleMouseEnter(article._id)}
  //       onMouseLeave={() => handleMouseLeave(null)}
  //       className={newsFeedItemStyles}
  //     >
  //       <div>{article.title}</div>
  //       <div>{article.body}</div>
  //       <div>{`0${month} - ${year}`}</div>

  //       {article.comments.map((comment) => {
  //         const commentDate = new Date(comment.date);
  //         const month = commentDate.getMonth();
  //         const year = commentDate.getFullYear();

  //         return (
  //           <div key={comment._id}>
  //             <div>{comment.author}</div>
  //             <div>{comment.body}</div>
  //             <div>{`0${month} - ${year}`}</div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // });

  // return <div>{renderedArticle}</div>;
  return (
    <>
      <div className={newsFeedContainerStyles}>
        <div className={newsFeedItemStyles}>{article.title}</div>
        <div>{article.body}</div>
        <div>{article.author}</div>
        <div>{article.synopsis}</div>
        <div>{article._id}</div>
      </div>

      <Link to="/articles">
        <Button danger>Back</Button>
      </Link>
      <Link to={`/articles/${id}/edit`}>
        <Button success>Edit</Button>
      </Link>
    </>
  );
};
