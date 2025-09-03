import { useContext } from "react";

import { ArticleContext } from "../context/ArticleContext";
import { ArticleCard } from "./ArticleCard";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";

export const ArticleList = () => {
  const { articleList } = useContext(ArticleContext);

  if (!articleList || articleList.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="place-content-center">
      <div
        className="p-2 m-2 flex flex-col justify-center items-center grid
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <ArticleCard />
      </div>
    </div>
  );
};
