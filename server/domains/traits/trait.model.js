import mongoose from "mongoose";

const TraitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: Number, default: 1 },
});

export default mongoose.model("Trait", TraitSchema);
