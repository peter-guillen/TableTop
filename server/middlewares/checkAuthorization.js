const checkAuthorization = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Access Forbidden: Unauthorized Role" });
    }
    next();
  };
};

module.exports = checkAuthorization;
