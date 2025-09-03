import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Footer } from "../Footer";
import { Button } from "../../shared/components/Button";
import { ArticleContext } from "../../features/articles/context/ArticleContext";

import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const Home = () => {
  const { articleList } = useContext(ArticleContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const newsFeedContainer = twMerge(
    classNames(
      "p-8 pl-20 pr-20 m-5 border-2 rounded-md grid grid-cols-3 gap-x-20 text-center"
    )
  );

  const homeItem = twMerge(
    classNames(
      "p-8 pl-20 pr-20 m-5 border-2 rounded-md flex flex-wrap text-center bg-gray-200 dark:bg-gray-600 place-content-center text-center"
    )
  );

  const homeContainer = twMerge(classNames("grid grid-cols-3"));

  const homeImage = twMerge(
    classNames("border border-black rounded-md w-64 h-60")
  );

  const newsFeedItem = (articleId) =>
    classNames(
      "p-6 m-6 rounded-md dark:bg-blue-600 bg-blue-300",
      hoveredIndex === articleId && "dark:bg-blue-500 bg-blue-600"
    );

  const renderedArticle = articleList.map((article) => {
    const articleDate = new Date(article.createdAt);
    const getMonth = articleDate.getMonth() + 1;
    const getYear = articleDate.getFullYear();
    return (
      <div
        className={newsFeedItem(article._id)}
        key={article._id}
        onMouseEnter={() => handleMouseEnter(article._id)}
        onMouseLeave={() => handleMouseLeave(null)}
      >
        <Link to={`/articles/${article._id}`}>
          <div className="text-3xl font-bold pb-4 ">{article.title}</div>
          <div className="pl-2 pr-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque id
            porro at minus maxime? Assumenda veritatis impedit ea sed, earum
            eveniet consectetur excepturi voluptates iusto iste nam quod
            molestiae provident.
          </div>
          <div className="text-gray-500 pt-4">{`Posted ${getMonth} - ${getYear} ago`}</div>
        </Link>
      </div>
    );
  });

  const handleMouseEnter = (articleId) => {
    setHoveredIndex(articleId);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <section className={homeContainer}>
        <div className={homeItem}>
          <h3 className="text-xl pb-4">Rules</h3>
          <div className={homeImage}>Image goes here!</div>
          <div className="pt-4">
            The rules tab highlights events handling and useReducer to handle
            realtime changes.
          </div>
        </div>
        <div className={homeItem}>
          <h3 className="text-xl pb-4">Articles</h3>
          <div className={homeImage}>Image goes here!</div>
          <div className="pt-4">
            Articles displays the use of articles and user comments and
            feedback.
          </div>
        </div>
        <div className={homeItem}>
          <h3 className="text-xl pb-4">Spells</h3>
          <div className={homeImage}>Image goes here!</div>
          <div className="pt-4">
            Showcases the use of drag and drop functionality. As well as the use
            of the Dungeons and Dragons API.
          </div>
        </div>
        <div className={homeItem}>
          <h3 className="text-xl pb-4">Classes</h3>
          <div className={homeImage}>Image goes here!</div>
          <div className="pt-4">
            The classes tab can be used to view CRUD functionality.
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 text-center">
        {renderedArticle}
      </section>
      <section className={`${newsFeedContainer}`}>
        <Button primary>Rules</Button>
        <Button danger>Character Creation</Button>
        <Button warning>Campaigns</Button>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
