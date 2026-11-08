import mongoose from "mongoose";

// One entry per logged-out token. checkAuthenticated rejects any token whose
// jti (unique token id) is listed here.
const RevokedTokenSchema = new mongoose.Schema({
  jti: { type: String, required: true, unique: true },
  // When the token would have expired on its own. The TTL index (expires: 0)
  // has MongoDB delete the entry at that time, so the collection stays small
  expiresAt: { type: Date, required: true, expires: 0 },
});

export default mongoose.model("RevokedToken", RevokedTokenSchema);
