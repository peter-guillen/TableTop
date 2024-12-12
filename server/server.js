const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1234;
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/users");
const articleRoutes = require("./routes/articles");
const professionRoutes = require("./routes/professions");
const powersRoutes = require("./routes/powers");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/powers-app");

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
app.use("/api/powers", powersRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
