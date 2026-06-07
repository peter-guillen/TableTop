import mongoose from "mongoose";

const BackgroundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Background", BackgroundSchema);
