export interface Spell {
  _id: string;
  description: string;
  // category: string;

  name: string;
  school: string;
  tier: string;
  element: string;
  tags: [];
  castingTime: string;
  isRitual: string;
  stamina: string;
  usesPerDay: string;
  range: string;
  area: string;
  target: string;
  attackType: string;
  duration: string;
  requiresConcentration: string;
  damage: [];
  healing: [];
  conditions: [];
  buffs: [];
  debuffs: [];
}
