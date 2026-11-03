import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";

import {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} from "./article.controller.js";

router.get("/", getArticles);
router.get("/:id", getArticle);

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
  updateArticle,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator"]),
  deleteArticle,
);

export default router;
