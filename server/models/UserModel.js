const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "EDITOR", "USER", "GUEST"],
    default: "GUEST",
  },
  firstName: String,
  lastName: String,
  dob: String,
  address: String,
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
