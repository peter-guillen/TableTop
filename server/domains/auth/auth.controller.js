import User from "../users/user.model.js";
import generateToken from "../../shared/middlewares/jwtoken.js";

const userMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Mobile keyboards often add a trailing space after an email suggestion
  const user = await User.findOne({ email: String(email ?? "").trim() });
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
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

const logoutUser = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

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
