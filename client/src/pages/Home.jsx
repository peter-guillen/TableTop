import { useState, useContext } from "react";

import ArticleContext from "../hooks/articleFastRefreshHook";
import Footer from "../components/Footer";

import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const Home = () => {
  const { articleList } = useContext(ArticleContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const newsFeedBannerStyles = twMerge(
    classNames(
      "p-5 m-5 border-2 rounded-md grid grid-cols-3 gap-4 bg-yellow-200 text-center"
    )
  );
  const newsFeedContainerStyles = twMerge(
    classNames(
      "p-5 m-5 border-2 rounded-md grid grid-cols-3 gap-4 bg-red-200 text-center"
    )
  );

  const newsFeedItem = twMerge(
    classNames(
      "p-6 m-6 rounded-md bg-blue-200",
      // "bg-red-400": hoveredIndex !== null,
      // hoveredIndex !== null && "bg-red-400"
      { "bg-indigo-400": hoveredIndex === articleId }
    )
  );
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
        <div className="text-center">50% off sale on all classes!</div>
      </section>

      <section className="grid grid-cols-3 text-center">
        {articleList.map((article) => (
          <div
            className={newsFeedItem}
            key={article._id}
            onMouseEnter={() => handleMouseEnter(article._id)}
            onMouseLeave={() => handleMouseLeave(null)}
          >
            <div>{article.title}</div>
            <div>{article.createdAt}</div>
            <div>{article.updatedAt}</div>
          </div>
        ))}
      </section>

      <section className={`${newsFeedContainerStyles}`}>
        <div>Rules</div>
        <div>Character Creation</div>
        <div>Campaigns</div>
      </section>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
