const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "MODERATOR", "EDITOR", "USER", "GUEST"],
    default: "GUEST",
  },
  firstName: String,
  lastName: String,
  dob: String,
  address: String,

  // const bcrypt = require("bcrypt");
  // userSchema.methods.comparePassword = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  // };
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
