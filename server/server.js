const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 1234;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const cookieParser = require("cookie-parser");

const activityRoutes = require("./routes/activityRoutes.js");
const affinityRoutes = require("./routes/affinityRoutes.js");
const armorRoutes = require("./routes/armorRoutes.js");
const articleRoutes = require("./routes/articleRoutes");
const backgroundRoutes = require("./routes/backgroundRoutes.js");
const libraryRoutes = require("./routes/libraryRoutes.js");
const professionRoutes = require("./routes/professionRoutes");
const speciesRoutes = require("./routes/speciesRoutes.js");
const spellRoutes = require("./routes/spellRoutes");
const traitRoutes = require("./routes/traitRoutes.js");
const userRoutes = require("./routes/userRoutes");
const weaponRoutes = require("./routes/weaponRoutes.js");

if (!process.env.MONGODB_URI && process.env.NODE_ENV === "production") {
  throw new Error("MONGODB_URI is required in production");
}
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/activity", activityRoutes);
app.use("/api/affinities", affinityRoutes);
app.use("/api/armors", armorRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/backgrounds", backgroundRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/professions", professionRoutes);
app.use("/api/species", speciesRoutes);
app.use("/api/spells", spellRoutes);
app.use("/api/traits", traitRoutes);
app.use("/api/users", userRoutes);
app.use("/api/weapons", weaponRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
