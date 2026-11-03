import User from "../../domains/users/user.model.js";

// Reads the role from the database rather than the JWT, so a role change made
// in the admin page applies on the user's next request instead of next login
const checkAuthorization = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).select("role").lean();

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      if (!roles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Access Forbidden: Unauthorized Role" });
      }

      req.user.role = user.role;
      next();
    } catch (error) {
      res.status(500).json({ message: "Failed to check authorization" });
    }
  };
};

export default checkAuthorization;
