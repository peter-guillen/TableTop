import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import Button from "../components/Button";
import ArticleContext from "../hooks/articleFastRefreshHook";

import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const Home = () => {
  const { articleList } = useContext(ArticleContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const newsFeedBannerStyles = twMerge(
    classNames(
      "p-5 m-5 border-2 rounded-md grid grid-cols-3 gap-4 bg-yellow-300 text-center"
    )
  );

  const newsFeedContainerStyles = twMerge(
    classNames(
      "p-8 pl-20 pr-20 m-5 border-2 rounded-md grid grid-cols-3 gap-x-20 text-center"
    )
  );

  const newsFeedItem = (articleId) =>
    classNames(
      "p-6 m-6 rounded-md bg-blue-200",
      hoveredIndex === articleId && "bg-blue-300"
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
      <section className={newsFeedBannerStyles}>
        <img src="" alt="" />
        <div className="text-center text-xl">50% off sale on all classes!</div>
      </section>

      <section>
        <div>Project 1</div>
        <div>Project 2</div>
        <div>Project 3</div>
        <div>Project 4</div>
        <div>Project 5</div>
        <div>Project 6</div>
      </section>

      <section className="grid grid-cols-3 text-center">
        {renderedArticle}
      </section>

      <section className={`${newsFeedContainerStyles}`}>
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

export default Home;
