import jwt from "jsonwebtoken";
import User from "../../domains/users/user.model.js";
import RevokedToken from "../../domains/auth/revokedToken.model.js";

// A valid signature isn't enough: the token also has to be not logged out,
// belong to a user who still exists, and match that user's tokenVersion.
// The role is read from the database here so a role change applies on the
// user's next request; checkAuthorization uses req.user.role from this.
const checkAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  // Tokens made before logout revocation existed have no id and can't be
  // revoked, so they're refused. Those users log in once more.
  if (!decoded.jti) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  try {
    const revoked = await RevokedToken.exists({ jti: decoded.jti });
    if (revoked) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Session has ended" });
    }

    const user = await User.findById(decoded._id)
      .select("role tokenVersion")
      .lean();
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    if ((user.tokenVersion ?? 0) !== (decoded.tv ?? 0)) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Session has ended" });
    }

    req.user = { _id: decoded._id, role: user.role };
    next();
  } catch (error) {
    res.status(500).json({ message: "Failed to check authentication" });
  }
};

export default checkAuthenticated;
