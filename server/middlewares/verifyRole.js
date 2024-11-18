const verifyRole = (roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      res.status(403).json({ message: "Access Forbidden: Unauthorized Role" });
    }
    next();
  };
};

module.exports = verifyRole;
