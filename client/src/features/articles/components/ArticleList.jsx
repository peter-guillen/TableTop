// import { useContext } from "react";

// import { ArticleContext } from "../context/ArticleContext";
import { ArticleCard } from "./ArticleCard";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { useGetAllArticlesQuery } from "../api/articleApi";

export const ArticleList = () => {
  const { data: articleList } = useGetAllArticlesQuery();
  // const { articleList } = useContext(ArticleContext);

  if (!articleList || articleList.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ArticleCard />
    </>
  );
};
