const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1234;
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const professionRoutes = require("./routes/professionRoutes");
const spellRoutes = require("./routes/spellRoutes");
const weaponRoutes = require("./routes/weaponRoutes.js");
const armorRoutes = require("./routes/armorRoutes.js");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/spells-app");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/professions", professionRoutes);
app.use("/api/spells", spellRoutes);
app.use("/api/weapons", weaponRoutes);
app.use("/api/armors", armorRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
