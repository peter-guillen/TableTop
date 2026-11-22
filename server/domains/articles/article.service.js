import Article from "./article.model.js";
import { logAction } from "../../shared/utils/logger.js";

const getAllArticles = async () => {
  return await Article.find({}).lean();
};

const getArticleById = async (id) => {
  return await Article.findById(id).lean();
};

const createArticle = async (articleData, userId) => {
  const article = await Article.create(articleData);
  await logAction({
    userId,
    action: "Created Article",
    target: "Article",
    targetId: article._id,
    metadata: { before: null, after: article.toObject() },
  });
  return article;
};

const updateArticle = async (id, updateData, userId) => {
  const before = await Article.findById(id).lean();
  if (!before) return null;

  const after = await Article.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Article",
    target: "Article",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deleteArticle = async (id, userId) => {
  const before = await Article.findById(id).lean();
  if (!before) return null;

  await Article.findByIdAndDelete(id);

  await logAction({
    userId,
    action: "Deleted Article",
    target: "Article",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
