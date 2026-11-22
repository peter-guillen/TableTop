import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import validateObjectId from "../../shared/middlewares/validateObjectId.js";

import {
  getAllArticles,
  getArticleById,
  createArticle,
  deleteArticle,
  updateArticle,
} from "./article.controller.js";

router.get("/", getAllArticles);
router.get("/:id", validateObjectId, getArticleById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator", "editor"]),
  createArticle,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator", "editor"]),
  validateObjectId,
  updateArticle,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator"]),
  validateObjectId,
  deleteArticle,
);

export default router;
