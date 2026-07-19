import { useEffect, useState } from "react";
import { LuTarget, LuSparkles } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";

import {
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "../api/articleApi.tsx";

import { ArticleFormData } from "../articleTypes.ts";

export function ArticleForm() {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    body: "",
    synopsis: "",
    author: "",
    comments: [],
    createdAt: "",
    updatedAt: "",
  });

  // Grab the id from url: if there is an id set to Edit Mode
  const { id } = useParams();
  const isEditing = Boolean(id);

  // Return to the previous page
  const navigate = useNavigate();

  const {
    data: article,
    isLoading,
    isError,
  } = useGetArticleByIdQuery(id ?? "", { skip: !isEditing });
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const { handleInputChange } = useFormHandlers(setFormData);

  useEffect(() => {
    if (isEditing && article) {
      setFormData({ ...article });
    }
  }, [isEditing, article]);

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      await updateArticle({ id: id ?? "", data: formData });
    } else {
      await createArticle(formData);
    }
    navigate("/articles");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  const inputClasses =
    "w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-350 via-cyan-350 to-slate-300 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuSparkles
              className="text-cyan-400 dark:text-orange-400"
              size={32}
            />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-500 dark:from-cyan-300 dark:via-orange-300 dark:to-cyan-400">
              {isEditing ? "Edit Article" : "Create Article"}
            </h1>
          </div>
          <p className="text-slate-400 dark:text-slate-500">
            Weave your magical creation
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
                  <LuTarget size={20} />
                  Article Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Name your spell..."
                      value={formData.title}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Synopsis
                    </label>
                    <textarea
                      rows={2}
                      name="synopsis"
                      placeholder="A short teaser..."
                      value={formData.synopsis}
                      onChange={handleInputChange}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      name="body"
                      placeholder="Describe what the spell does..."
                      value={formData.body}
                      onChange={handleInputChange}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-orange-800/50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-orange-700 dark:border-orange-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-500 dark:to-orange-500 text-white shadow-lg shadow-cyan-500/50 dark:shadow-orange-500/50 hover:shadow-xl hover:shadow-cyan-500/60 dark:hover:shadow-orange-500/60 transition-all duration-300"
            >
              {isEditing ? "Update Article" : "Create Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
