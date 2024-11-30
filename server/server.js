const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1234;
require("dotenv").config();
const checkAuthenticated = require("./middlewares/checkAuthenticated");

const userRoutes = require("./routes/users");
const articleRoutes = require("./routes/articles");
const professionRoutes = require("./routes/professions");
const powersRoutes = require("./routes/powers");

const cookieParser = require("cookie-parser");
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

app.get("/api/test-cookie", (req, res) => {
  console.log("Server: Test cookie endpoint hit");
  console.log("Server: Cookies received:", req.cookies);
  console.log("Server: Raw cookie header:", req.headers.cookie);

  // Deliberately set a test cookie
  res
    .cookie("testCookie", "hello world", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    })
    .json({
      message: "Test cookie endpoint",
      cookies: req.cookies,
    });
});
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/professions", professionRoutes);
app.use("/api/powers", powersRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
