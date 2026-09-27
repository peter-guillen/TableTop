import mongoose from "mongoose";
import {
  PROPERTIES,
  ARMOR,
  SKILLS,
  STATS,
} from "../../shared/constants/constants.js";

const GrantSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["auto", "professionChoice", "playerChoice"],
    required: true,
  },
  trait: { type: mongoose.Schema.Types.ObjectId, ref: "Power" }, // Granted automatically at level
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "Power" }], // Profession choice at level
});

const LevelRewardSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  grants: [GrantSchema],
});

const ProfessionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  statModifiers: [
    {
      stat: { type: String, enum: STATS },
      value: Number,
      durationType: String,
      duration: Number,
      target: String,
      description: String,
    },
  ],
  armorProficiencies: [{ type: String, enum: ARMOR }],
  weaponProficiencies: [{ type: String, enum: PROPERTIES }],
  skillProficiencies: [{ type: String, enum: SKILLS }],
  startingItems: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, default: 1 },
    },
  ],
  levelRewards: [LevelRewardSchema],
});

// pre('validate') on ProfessionSchema, walking each levelRewards[].grants[]:
// auto      → requires trait, forbids options
// profChoice → requires options.length >= 2, forbids trait
// playerChoice → forbids both trait and options

export default mongoose.model("Profession", ProfessionSchema);
