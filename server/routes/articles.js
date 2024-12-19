const express = require("express");
const router = express.Router();

const {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} = require("../controllers/articleController");

router.get("/", getArticles);
router.post("/", createArticle);

router.get("/:id", getArticle);
router.delete("/:id", deleteArticle);
router.patch("/:id", updateArticle);

module.exports = router;
