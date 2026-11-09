import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

const generateToken = (user) => {
  return jwt.sign(
    // tv: the user's tokenVersion when the token was made
    { _id: user._id, role: user.role, tv: user.tokenVersion ?? 0 },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
      // A unique id for this token, so logout can revoke just this one
      jwtid: randomUUID(),
    },
  );
};

export default generateToken;
