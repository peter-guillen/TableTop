import User from "./user.model.js";
import { logAction } from "../../shared/utils/logger.js";

// Only admin actions on other accounts (role changes and deletes) go to the
// activity log. Signups and profile edits are ordinary user activity and
// would drown out the content changes the log is for. Log entries keep just
// the username and role: moderators can read the log but not the user list,
// so full records (email, profile) stay out of it.

const getAllUsers = async () => {
  return await User.find({}).select("-password").lean();
};

const getUserById = async (id) => {
  return await User.findById(id).select("-password").lean();
};

const createUser = async (userData) => {
  // role is never taken from the request; new accounts get the schema default
  const { email, username, password } = userData ?? {};
  // new + save (not findOneAndUpdate) so the pre("save") hook hashes the password
  const user = new User({ email, username, password });
  await user.save();
  return user;
};

const updateUserRole = async (id, role, actingUserId) => {
  // Stops an admin from demoting themselves and locking everyone out
  if (String(actingUserId) === String(id)) {
    throw Object.assign(new Error("You cannot change your own role"), {
      status: 400,
    });
  }

  const before = await User.findById(id).select("-password").lean();
  if (!before) return null;

  // runValidators rejects any role outside the enum in user.model.js
  const after = await User.findByIdAndUpdate(
    id,
    { $set: { role } },
    { new: true, runValidators: true },
  )
    .select("-password")
    .lean();

  await logAction({
    userId: actingUserId,
    action: "Updated User Role",
    target: "User",
    targetId: after._id,
    metadata: {
      before: { username: before.username, role: before.role },
      after: { username: after.username, role: after.role },
    },
  });

  return after;
};

const deleteUser = async (id, actingUserId) => {
  // Same rule as role changes: an admin can't remove their own account here
  if (String(actingUserId) === String(id)) {
    throw Object.assign(new Error("You cannot delete your own account"), {
      status: 400,
    });
  }

  const before = await User.findById(id).select("-password").lean();
  if (!before) return null;

  await User.findByIdAndDelete(id);

  await logAction({
    userId: actingUserId,
    action: "Deleted User",
    target: "User",
    targetId: before._id,
    metadata: {
      before: { username: before.username, role: before.role },
      after: null,
    },
  });

  return before;
};

// Any logged-in user edits their own profile. Every field is optional, and
// only these keys are read so nobody can set their own role this way
const updateMyProfile = async (userId, profileData) => {
  const { name, showName, pronouns, bio, location, timeZone } =
    profileData ?? {};

  // runValidators rejects anything over the maxlength limits in user.model.js
  return await User.findByIdAndUpdate(
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
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRole,
  deleteUser,
  updateMyProfile,
};
