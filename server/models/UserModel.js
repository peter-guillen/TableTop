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
  firstName: String,
  lastName: String,
  dob: String,
  address: String,
});

// Hash the password before saving it
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare the password
UserSchema.methods.comparePassword = async function (password) {
  // return await bcrypt.compare(password, this.password);
  return await bcrypt.compare(String(password), String(this.password));
};

module.exports = mongoose.model("User", UserSchema);
