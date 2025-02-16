const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "MODERATOR", "EDITOR", "USER", "GUEST"],
    default: "GUEST",
  },
});

// Hash the password before saving it
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const pepper = process.env.PEPPER;
    // This is where I could add the pepper to ensure an extra layer of saftey
    this.password = await bcrypt.hash(this.password + pepper, salt);
  }
  next();
});

// Method to compare the password
UserSchema.methods.comparePassword = async function (password) {
  // -- Return to this to remove String so that it is handled properly by the frontend
  // return await bcrypt.compare(password, this.password);
  return await bcrypt.compare(
    String(password) + process.env.PEPPER,
    String(this.password)
  );
};

module.exports = mongoose.model("User", UserSchema);
