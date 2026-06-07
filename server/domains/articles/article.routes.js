import express from "express";
const router = express.Router();

import {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} from "./article.controller.js";

router.get("/", getArticles);
router.post("/", createArticle);

router.get("/:id", getArticle);
router.delete("/:id", deleteArticle);
router.patch("/:id", updateArticle);

export default router;
