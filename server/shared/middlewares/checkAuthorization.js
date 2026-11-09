// Always runs after checkAuthenticated, which has already loaded the user's
// current role from the database into req.user.role. So a role change made in
// the admin page still applies on the user's next request, without a second
// database lookup here.
const checkAuthorization = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access Forbidden: Unauthorized Role" });
    }
    next();
  };
};

export default checkAuthorization;
