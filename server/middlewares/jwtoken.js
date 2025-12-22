const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log(user);
  return jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
