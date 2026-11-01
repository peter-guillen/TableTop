// import { useContext } from "react";
import { NavLink } from "react-router-dom";
// import { ArticleContext } from "../context/ArticleContext";
import { LuSparkles } from "react-icons/lu";
import { useGetAllArticlesQuery } from "../api/articleApi";

export const ArticleCard = () => {
  const { data: articleList } = useGetAllArticlesQuery();
  // const { articleList } = useContext(ArticleContext);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articleList.map((article) => {
          return (
            <NavLink to={`/articles/${article._id}/edit`} key={article._id}>
              <div className="block group cursor-pointer">
                <div
                  className="
                bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-6
                hover:shadow-lg hover:border-emerald-600 dark:hover:border-emerald-500
                transition-colors duration-200
                "
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-emerald-700 dark:bg-emerald-500 flex items-center justify-center mb-4">
                    {/* <IconComponent className="w-8 h-8 text-white" /> */}
                    <LuSparkles className="w-8 h-8 text-white dark:text-stone-950" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {article.title}
                  </h3>

                  <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">
                    {article.synopsis}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500 dark:text-stone-500">
                        Author:
                      </span>
                      <span className="font-medium text-stone-900 dark:text-stone-300">
                        {article.author}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500 dark:text-stone-500">
                        Date Added:
                      </span>
                      <span className="font-medium text-stone-900 dark:text-stone-300">
                        {article.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
