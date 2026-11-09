import { NavLink } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import { useGetAllArticlesQuery } from "../api/articleApi";
import {
  cardInteractive,
  iconTile,
  ink,
  inkMuted,
  inkSubtle,
  line,
} from "../../../shared/styles/theme.ts";

export const ArticleCard = () => {
  const { data: articleList = [] } = useGetAllArticlesQuery();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articleList.map((article) => {
        return (
          <NavLink
            to={`/articles/${article._id}`}
            key={article._id}
            className={`group flex flex-col p-6 ${cardInteractive}`}
          >
            {/* Icon */}
            <div className={`self-start mb-4 ${iconTile}`}>
              <LuSparkles className="h-6 w-6" aria-hidden="true" />
            </div>

            {/* Content */}
            <h3
              className={`text-xl font-bold mb-2 transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400 ${ink}`}
            >
              {article.title}
            </h3>

            <p
              className={`text-sm leading-relaxed mb-6 line-clamp-2 ${inkMuted}`}
            >
              {article.synopsis}
            </p>

            {/* Stats */}
            <div className={`mt-auto pt-4 border-t space-y-2 ${line}`}>
              <div className="flex justify-between text-sm">
                <span className={inkSubtle}>Author</span>
                <span className={`font-medium ${ink}`}>{article.author}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={inkSubtle}>Date Added</span>
                <span className={`font-medium ${ink}`}>
                  {article.createdAt}
                </span>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
