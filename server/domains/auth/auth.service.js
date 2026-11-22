import User from "../users/user.model.js";
import RevokedToken from "./revokedToken.model.js";

// Logins and logouts are not written to the activity log: they aren't game
// records, and logging them would bury content edits in the admin view.

const getCurrentUser = async (userId) => {
  return await User.findById(userId).select("-password");
};

// Returns the user when the email and password match, otherwise null
const findUserByCredentials = async (email, password) => {
  // Mobile keyboards often add a trailing space after an email suggestion
  const user = await User.findOne({ email: String(email ?? "").trim() });
  if (!user) return null;
  const isMatch = await user.comparePassword(password);
  return isMatch ? user : null;
};

// Adds a token's id to the revoked list until the token would have expired
const revokeToken = async (jti, exp) => {
  // upsert: logging out twice with the same token isn't an error
  await RevokedToken.updateOne(
    { jti },
    { $setOnInsert: { expiresAt: new Date(exp * 1000) } },
    { upsert: true },
  );
};

export { getCurrentUser, findUserByCredentials, revokeToken };
