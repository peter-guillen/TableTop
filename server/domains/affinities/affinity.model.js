import mongoose from "mongoose";

const AffinitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Affinity", AffinitySchema);
