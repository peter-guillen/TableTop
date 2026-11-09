import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

import constantsRoutes from "./shared/constants/constants.routes.js";
import authRoutes from "./domains/auth/auth.routes.js";

import activityRoutes from "./domains/activity/activity.routes.js";
import articleRoutes from "./domains/articles/article.routes.js";
import backgroundRoutes from "./domains/backgrounds/background.routes.js";
import characterRoutes from "./domains/characters/character.routes.js";
import conditionRoutes from "./domains/conditions/condition.routes.js";
import itemRoutes from "./domains/items/item.routes.js";
import powerRoutes from "./domains/powers/power.routes.js";
import professionRoutes from "./domains/professions/profession.routes.js";
import speciesRoutes from "./domains/species/species.routes.js";
import userRoutes from "./domains/users/user.routes.js";

app.use("/api/constants", constantsRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/activity", activityRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/backgrounds", backgroundRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/conditions", conditionRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/powers", powerRoutes);
app.use("/api/professions", professionRoutes);
app.use("/api/species", speciesRoutes);
app.use("/api/users", userRoutes);

// Handles every error passed to next(error), mostly from write handlers.
// Must be registered last, and must keep all four parameters: that's how
// Express recognizes an error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  // Bad input: failed schema validation or a value of the wrong type
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ error: err.message });
  }
  // Errors that already carry a 4xx status, e.g. a malformed JSON body
  // rejected by express.json()
  if (err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ error: err.message });
  }
  // Anything else is a server failure. Log the details, but don't send them
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;
