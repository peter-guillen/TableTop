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

import activityRoutes from "./domains/activity/activity.routes.js";
import affinityRoutes from "./domains/affinities/affinity.routes.js";
import armorRoutes from "./domains/armors/armor.routes.js";
import articleRoutes from "./domains/articles/article.routes.js";
import backgroundRoutes from "./domains/backgrounds/background.routes.js";
import characterRoutes from "./domains/characters/character.routes.js";
import libraryRoutes from "./domains/library/library.routes.js";
import professionRoutes from "./domains/professions/profession.routes.js";
import speciesRoutes from "./domains/species/species.routes.js";
import spellRoutes from "./domains/spells/spell.routes.js";
import traitRoutes from "./domains/traits/trait.routes.js";
import userRoutes from "./domains/users/user.routes.js";
import weaponRoutes from "./domains/weapons/weapon.routes.js";

app.use("/api/constants", constantsRoutes);

app.use("/api/activity", activityRoutes);
app.use("/api/affinities", affinityRoutes);
app.use("/api/armors", armorRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/backgrounds", backgroundRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/professions", professionRoutes);
app.use("/api/species", speciesRoutes);
app.use("/api/spells", spellRoutes);
app.use("/api/traits", traitRoutes);
app.use("/api/users", userRoutes);
app.use("/api/weapons", weaponRoutes);

export default app;
