const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  // const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header
  const token = req.cookies["token"]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // Attach the decoded user data to the request object for future use
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = ensureAuthenticated;
