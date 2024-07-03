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

// Ensuring there is no error for CORS 'Access-Control-Allow-Origin'
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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
app.use("/api/professions", ensureIsAuthenticated, professionRoutes);
app.use("/api/powers", powersRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// Question 1: I am using mongoDB for my database, how do I implement the logout login instead of localstorage
// Question 2: Inside of my userAPI loginUser function why is this code added. Please explain to me its use and why its important.
// const data = await response.json();
//     return data; // This should include success, user data, and token
//   } catch (error) {
//     console.error('Login error:', error);
//     return { success: false, message: error.message };
//   }
// Question 3: Please explain step 3:
// import { useContext } from 'react';
// import AuthContext from '../hooks/authFastRefreshHook';

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// Question 4: I see that we're using useAuth hook from step 3 inside of step 4, why not just use the AuthContext from the fast refresh hook? Why take this extra step?
