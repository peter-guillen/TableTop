const Article = require("../models/ArticleModel");

const getArticles = async (req, res) => {
  const articles = await Article.find({});
  res.status(200).json(articles);
};

const getArticle = async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.status(200).json(article);
};

const createArticle = async (req, res) => {
  try {
    const { title, author, body, synopsis, comments } = req.body;
    const article = await Article.create({
      title,
      author,
      body,
      synopsis,
      comments,
    });
    res.status(200).json(article);
  } catch (error) {
    console.log(`Error while posting article`, error);
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const article = await Article.findByIdAndUpdate({ _id: id }, { ...req.body });
  res.status(200).json(article);
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const article = await Article.findByIdAndDelete(id);
  res.status(200).json(article);
};

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
