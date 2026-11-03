import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "moderator", "editor", "user", "guest"],
    default: "guest",
  },
  // Everything in here is optional and edited by the user on their profile page
  profile: {
    name: { type: String, maxlength: 50, default: "" },
    // When true (and a name is set) the site shows the name instead of the username
    showName: { type: Boolean, default: false },
    pronouns: { type: String, maxlength: 30, default: "" },
    bio: { type: String, maxlength: 500, default: "" },
    location: { type: String, maxlength: 100, default: "" },
    timeZone: { type: String, maxlength: 64, default: "" },
  },
});

// Hash the password before saving it
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const pepper = process.env.PEPPER;
    this.password = await bcrypt.hash(this.password + pepper, salt);
  }
});

// Method to compare the password
UserSchema.methods.comparePassword = async function (password) {
  // -- Return to this to remove String so that it is handled properly by the frontend
  // return await bcrypt.compare(password, this.password);
  return await bcrypt.compare(
    String(password) + process.env.PEPPER,
    String(this.password),
  );
};

export default mongoose.model("User", UserSchema);
