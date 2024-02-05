const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1234;
const professionRoutes = require("./routes/professions");
const articleRoutes = require("./routes/articles");
const powersRoutes = require("./routes/powers");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/powers-app");

app.use(cors());
app.use(express.json());

app.use("/api/professions", professionRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/powers", powersRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
