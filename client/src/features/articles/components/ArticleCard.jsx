import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ArticleContext } from "../context/ArticleContext";
import { LuSparkles } from "react-icons/lu";

export const ArticleCard = () => {
  const { articleList } = useContext(ArticleContext);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articleList.map((article) => {
          return (
            <NavLink to={`/articles/${article._id}/edit`} key={article._id}>
              <div className="block group cursor-pointer">
                <div
                  className="
                bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6
                hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 
                hover:shadow-purple-500/10 transition-all duration-300
                hover:scale-105 hover:-translate-y-1
                "
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {/* <IconComponent className="w-8 h-8 text-white" /> */}
                    <LuSparkles className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {article.synopsis}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-500">
                        Author:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-300">
                        {article.author}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-500">
                        Date Added:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-300">
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
