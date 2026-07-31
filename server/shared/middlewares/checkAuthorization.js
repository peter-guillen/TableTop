const checkAuthorization = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!userRole || !roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access Forbidden: Unauthorized Role" });
    }
    next();
  };
};

export default checkAuthorization;
