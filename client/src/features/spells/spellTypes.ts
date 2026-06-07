export interface DiceRoll {
  diceCount: number;
  diceSize: number;
  modifier: number;
}

export type SpellSchool =
  | "abjuration"
  | "evocation"
  | "transmutation"
  | "divination"
  | "necromancy"
  | "conjuration"
  | "enchantment"
  | "illusion";

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
  buffs: string[];
  debuffs: string[];
}
