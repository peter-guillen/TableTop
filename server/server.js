const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1234;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/UserModel");
const userRoutes = require("./routes/users");
const articleRoutes = require("./routes/articles");
const professionRoutes = require("./routes/professions");
const powersRoutes = require("./routes/powers");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/powers-app");

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "my_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const ensureIsAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/professions", professionRoutes);
app.use("/api/powers", powersRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
