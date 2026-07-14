import { DiceRoll } from "../library/constantTypes";

export type SpellSchool =
  | "abjuration"
  | "evocation"
  | "transmutation"
  | "divination"
  | "necromancy"
  | "conjuration"
  | "enchantment"
  | "illusion";

export interface StatModifier {
  stat: string;
  value: number;
  duration: string;
  target: string;
  description: string;
}
export interface Spell {
  _id: string;
  name: string;
  description: string;
  category: string;
  school: SpellSchool;
  tier: string;
  element: string;
  tags: string[];
  castingTime: string;
  isRitual: boolean;
  stamina: number;
  usesPerDay: string;
  range: string;
  area: string;
  target: string;
  attackType: string;
  duration: string;
  requiresConcentration: boolean;
  damage: DiceRoll[];
  healing: DiceRoll[];
  conditions: string[];
  statModifiers: StatModifier[];
}
