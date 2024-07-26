const verifyRole = (roles) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && roles.includes(req.user.role)) {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  };
};

module.exports = verifyRole;
