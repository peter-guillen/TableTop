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
import {
  formCard,
  formHeading,
  formInput,
  formLabel,
  formTitle,
  ghostButton,
  primaryButton,
} from "../../../shared/styles/theme.ts";

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

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuSparkles
              className="text-emerald-700 dark:text-emerald-400"
              size={32}
            />
            <h1 className={formTitle}>
              {isEditing ? "Edit Article" : "Create Article"}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400">
            Weave your magical creation
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={formCard}>
            <div className="space-y-8">
              <section>
                <h2 className={formHeading}>
                  <LuTarget size={20} />
                  Article Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={`${formLabel} mb-2`}>
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Name your spell..."
                      value={formData.title}
                      onChange={handleInputChange}
                      className={formInput}
                    />
                  </div>

                  <div>
                    <label className={`${formLabel} mb-2`}>
                      Synopsis
                    </label>
                    <textarea
                      rows={2}
                      name="synopsis"
                      placeholder="A short teaser..."
                      value={formData.synopsis}
                      onChange={handleInputChange}
                      className={`${formInput} resize-none`}
                    />
                  </div>

                  <div>
                    <label className={`${formLabel} mb-2`}>
                      Description
                    </label>
                    <textarea
                      rows={6}
                      name="body"
                      placeholder="Describe what the spell does..."
                      value={formData.body}
                      onChange={handleInputChange}
                      className={`${formInput} resize-none`}
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
              className={`${ghostButton} px-6 py-3`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${primaryButton} px-8 py-3`}
            >
              {isEditing ? "Update Article" : "Create Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
