import * as articleService from "./article.service.js";

const getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.status(200).json(articles);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load articles" });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await articleService.getArticleById(id);
    if (!article) {
      return res.status(404).json({ error: "Article Not Found!" });
    }
    res.status(200).json(article);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load article" });
  }
};

const createArticle = async (req, res, next) => {
  try {
    const article = await articleService.createArticle(req.body, req.user._id);
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await articleService.updateArticle(
      id,
      req.body,
      req.user._id,
    );
    if (!article) {
      return res.status(404).json({ error: "Article Not Found!" });
    }
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await articleService.deleteArticle(id, req.user._id);
    if (!article) {
      return res.status(404).json({ error: "Article Not Found!" });
    }
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

export {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
