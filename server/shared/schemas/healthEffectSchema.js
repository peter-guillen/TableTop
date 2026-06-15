import mongoose from "mongoose";

const HealthEffectsSchema = new mongoose.Schema(
  {
    direction: { type: String, enum: ["damage", "healing"] },
    diceSize: { type: Number }, // Size of the dice used (d4, d6, d8, d10, d12)
    diceCount: { type: Number }, // Number of the dice used (1d4, 2d6, 4d8, 1d10, 2d12)
    flat: { type: Number }, // Result is a preset number that requires no roll, 5
    persistent: { type: Boolean, default: false }, // If the result continues beyond the first turn
    duration: { type: Number }, // If it is persistent then how many turns does it last
  },
  { _id: false },
);

export default HealthEffectsSchema;
