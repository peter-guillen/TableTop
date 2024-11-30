const jwt = require("jsonwebtoken");

const checkAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Token successfully decoded:", decoded);
  req.user = decoded;
  next();
};

module.exports = checkAuthenticated;
