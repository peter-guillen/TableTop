import jwt from "jsonwebtoken";
import User from "../users/user.model.js";
import RevokedToken from "./revokedToken.model.js";
import generateToken from "../../shared/middlewares/jwtoken.js";

const userMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to load the current user" });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  let isMatch = false;
  try {
    // Mobile keyboards often add a trailing space after an email suggestion
    user = await User.findOne({ email: String(email ?? "").trim() });
    if (user) {
      isMatch = await user.comparePassword(password);
    }
  } catch (error) {
    return next(error);
  }
  if (!user || !isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const token = generateToken(user);
  const isProduction = process.env.NODE_ENV === "production";
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      // The client reaches the API through the Netlify proxy (_redirects), so
      // the cookie is first-party and Lax works. Lax also blocks most CSRF
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
};

const logoutUser = async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  // Revoke this browser's token so it stops working even if someone kept a
  // copy. Other devices stay logged in. A missing or already-invalid token
  // has nothing to revoke; the cookie is still cleared below.
  const token = req.cookies.token;
  let decoded = null;
  if (token) {
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      decoded = null;
    }
  }
  if (decoded?.jti) {
    try {
      // upsert: logging out twice with the same token isn't an error
      await RevokedToken.updateOne(
        { jti: decoded.jti },
        { $setOnInsert: { expiresAt: new Date(decoded.exp * 1000) } },
        { upsert: true },
      );
    } catch (error) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
      });
      return res
        .status(500)
        .json({ message: "Logged out here, but the session could not be revoked" });
    }
  }

  res
    .clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      // Same options as the login cookie, as Express recommends for clearCookie
      sameSite: "lax",
    })
    .status(200)
    .json({ success: true, message: "Logout successful" });
};

export { userMe, loginUser, logoutUser };
