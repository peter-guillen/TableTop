const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      res.status(403).json({ message: "Access Forbidden: Unauthorized Role" });
    }
  };
};

module.exports = verifyRole;
