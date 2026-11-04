import { useParams, Link } from "react-router-dom";
import { LuArrowLeft, LuBookOpen, LuPen } from "react-icons/lu";
import { useGetCurrentUserQuery } from "../../auth/api/authApi.tsx";
// import { ArticleContext } from "../context/ArticleContext";

import { NotFound } from "../../../app/pages/NotFound.tsx";

import { useGetArticleByIdQuery } from "../api/articleApi.tsx";
import {
  card,
  focusRing,
  ghostButton,
  ink,
  inkAccent,
  inkMuted,
  inkPrimary,
  inkSubtle,
  line,
  surface,
} from "../../../shared/styles/theme.ts";

export const ArticleDetails = () => {
  // const { articleList } = useContext(ArticleContext);
  const { id } = useParams();
  const { data: article, isLoading, isError } = useGetArticleByIdQuery(id);
  const { data: currentUser } = useGetCurrentUserQuery();
  const canEdit = ["admin", "moderator", "editor"].includes(
    currentUser?.role ?? "",
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError || !article) {
    return <NotFound />;
  }

  return (
    <div className={`min-h-screen p-6 md:p-8 ${surface} ${ink}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          {/* Back Link */}
          <Link
            to="/articles"
            className={`group inline-flex items-center gap-2 rounded-md font-medium transition-colors hover:text-stone-900 dark:hover:text-white ${inkSubtle} ${focusRing}`}
          >
            <LuArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to Articles
          </Link>

          {/* Edit is only offered to roles the server lets edit */}
          {canEdit && (
            <Link
              to={`/articles/${article._id}/edit`}
              className={`px-4 py-2 ${ghostButton}`}
            >
              <LuPen size={16} aria-hidden="true" />
              Edit
            </Link>
          )}
        </div>

        <article className={`p-5 sm:p-8 shadow-sm ${card}`}>
          {/* Header */}
          <header className={`pb-6 mb-6 border-b ${line}`}>
            <div className="flex items-center gap-3 mb-3">
              <LuBookOpen className={inkPrimary} size={32} aria-hidden="true" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight break-words">
                {article.title}
              </h1>
            </div>
            <p className={`font-medium ${inkAccent}`}>
              Written by {article.author}
            </p>
          </header>

          {/* Synopsis */}
          <p className={`text-lg italic leading-relaxed mb-6 ${inkMuted}`}>
            {article.synopsis}
          </p>

          {/* Body */}
          <p className={`text-lg leading-relaxed whitespace-pre-line ${ink}`}>
            {article.body}
          </p>
        </article>
      </div>
    </div>
  );
};
