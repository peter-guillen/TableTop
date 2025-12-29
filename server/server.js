const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 1234;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const professionRoutes = require("./routes/professionRoutes");
const spellRoutes = require("./routes/spellRoutes");
const weaponRoutes = require("./routes/weaponRoutes.js");
const armorRoutes = require("./routes/armorRoutes.js");
const activityRoutes = require("./routes/activityRoutes.js");

if (!process.env.MONGODB_URI && process.env.NODE_ENV === "production") {
  throw new Error("MONGODB_URI is required in production");
}
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/professions", professionRoutes);
app.use("/api/spells", spellRoutes);
app.use("/api/weapons", weaponRoutes);
app.use("/api/armors", armorRoutes);
app.use("/api/activity", activityRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
