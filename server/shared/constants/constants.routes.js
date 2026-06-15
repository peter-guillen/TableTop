import express from "express";
import { getConstants } from "./constants.controller.js";

const router = express.Router();
router.get("/", getConstants);
export default router;
