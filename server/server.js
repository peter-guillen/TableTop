import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 1234;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";

if (!process.env.MONGODB_URI && process.env.NODE_ENV === "production") {
  throw new Error("MONGODB_URI is required in production");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
