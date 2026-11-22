import { LuBookOpen } from "react-icons/lu";

import { ArticleCard } from "./ArticleCard";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { useGetAllArticlesQuery } from "../api/articleApi";
import {
  ink,
  inkMuted,
  inkPrimary,
  surface,
} from "../../../shared/styles/theme.ts";
import { EmptyState } from "../../../shared/components/EmptyState.tsx";
import { ErrorMessage } from "../../../shared/components/ErrorMessage.tsx";

export const ArticleList = () => {
  const {
    data: articleList = [],
    isLoading,
    isError,
  } = useGetAllArticlesQuery();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className={`min-h-screen p-6 md:p-8 ${surface} ${ink}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <LuBookOpen className={inkPrimary} size={32} aria-hidden="true" />
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Articles
            </h1>
          </div>
          <p className={`text-lg ${inkMuted}`}>
            News, lore, and design notes from the table
          </p>
        </div>

        {articleList.length > 0 ? (
          <ArticleCard />
        ) : (
          <EmptyState message="No articles yet." />
        )}
      </div>
    </div>
  );
};
