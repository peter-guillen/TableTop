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
    <>
      <ArticleCard />
    </>
  );
};
