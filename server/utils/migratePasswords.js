const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel"); // Adjust the path based on your project structure

async function migrateUserPasswords() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/spells-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = await User.find({});
    for (let user of users) {
      if (!user.password.startsWith("$2b$")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        console.log(`Updated password for user: ${user.username}`);
      }
    }

    console.log("Password migration completed.");
  } catch (error) {
    console.error("Error during password migration:", error);
  } finally {
    mongoose.connection.close();
  }
}

migrateUserPasswords();
