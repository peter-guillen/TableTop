import Article from "./article.model.js";

// Reads answer 500 themselves; ids are already checked by validateObjectId.
// Writes pass errors to next(error), and the error handler in app.js turns
// them into 400 (bad input) or 500 JSON responses.

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to load articles" });
  }
};

const getArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "Article Not Found!" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: "Failed to load article" });
  }
};

const createArticle = async (req, res, next) => {
  try {
    const article = await Article.create(req.body);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
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
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ error: "Article Not Found!" });
    }
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

export { getArticles, getArticle, createArticle, updateArticle, deleteArticle };
