import express from "express";
const router = express.Router();

import { getLibrary } from "./library.controller.js";

router.get("/", getLibrary);

export default router;
