import mongoose from "mongoose";

const ArchetypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Archetype", ArchetypeSchema);
