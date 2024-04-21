import { useContext } from "react";

import { ArticleContext } from "../contexts/ArticleContext";
import Footer from "../components/Footer";

import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const Home = () => {
  const { articleList } = useContext(ArticleContext);

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

  const newsFeedItem = twMerge(classNames("p-6 m-6 bg-blue-200"));

  return (
    <>
      <section className={newsFeedBannerStyles}>
        <img src="" alt="" />
        <div className="text-center">50% off sale on all classes!</div>
      </section>

      <section className="grid grid-cols-3 text-center">
        {articleList.map((article) => (
          <div className={newsFeedItem} key={article._id}>
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
