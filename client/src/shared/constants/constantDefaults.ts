import { HealthEffect, StatModifier } from "./constantTypes";

export const defaultHealthEffect: HealthEffect = {
  direction: "damage",
  diceSize: 0,
  diceCount: 0,
  flat: 0,
  persistent: false,
  duration: 0,
};

export const defaultStatModifier: StatModifier = {
  stat: "",
  value: 0,
  durationType: "turns",
  duration: 0,
  target: "",
  description: "",
};
