const checkAuthorization = (roles) => {
  return (req, res, next) => {
    // If the roles provided on the checkAuthorization middleware is not included then deny the user access
    const userRole = req.user.role;

    if (!userRole || !roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access Forbidden: Unauthorized Role" });
    }
    next();
  };
};

module.exports = checkAuthorization;
