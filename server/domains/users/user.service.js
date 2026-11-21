import User from "./user.model.js";
import { logAction } from "../../shared/utils/logger.js";

// Every read and every logged before/after leaves out the password hash: the
// activity log is visible to admins.

const getAllUsers = async () => {
  return await User.find({}).select("-password");
};

const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

// Signup. role is never taken from the caller; new accounts get the schema
// default. The new user is logged as the one who acted.
const createUser = async ({ email, username, password }) => {
  const user = new User({ email, username, password });
  await user.save();

  const { password: _hash, ...after } = user.toObject();
  await logAction({
    userId: user._id,
    action: "Created User",
    target: "User",
    targetId: user._id,
    metadata: { before: null, after },
  });

  return user;
};

const deleteUser = async (id, actorId) => {
  const user = await User.findByIdAndDelete(id).select("-password");
  if (!user) return null;

  await logAction({
    userId: actorId,
    action: "Deleted User",
    target: "User",
    targetId: user._id,
    metadata: { before: user.toObject(), after: null },
  });

  return user;
};

const updateUserRole = async (id, role, actorId) => {
  const before = await User.findById(id).select("-password").lean();
  if (!before) return null;

  // runValidators rejects any role outside the enum in user.model.js
  const after = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true },
  )
    .select("-password")
    .lean();
  // Deleted between the two queries
  if (!after) return null;

  await logAction({
    userId: actorId,
    action: "Updated User Role",
    target: "User",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

// Only these profile keys are read, so nobody can set their own role here
const updateMyProfile = async (userId, profile) => {
  const { name, showName, pronouns, bio, location, timeZone } = profile ?? {};

  const before = await User.findById(userId).select("-password").lean();
  if (!before) return null;

  // runValidators rejects anything over the maxlength limits in user.model.js
  const after = await User.findByIdAndUpdate(
    userId,
    {
      profile: {
        name: name?.trim() ?? "",
        showName: Boolean(showName),
        pronouns: pronouns?.trim() ?? "",
        bio: bio?.trim() ?? "",
        location: location?.trim() ?? "",
        timeZone: timeZone ?? "",
      },
    },
    { new: true, runValidators: true },
  )
    .select("-password")
    .lean();
  // Deleted between the two queries
  if (!after) return null;

  await logAction({
    userId,
    action: "Updated Profile",
    target: "User",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

export {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserRole,
  updateMyProfile,
};
