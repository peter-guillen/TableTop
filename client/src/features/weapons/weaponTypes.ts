import {
  Materials,
  Quality,
  Rarity,
  StatModifier,
  DamageType,
  Properties,
} from "../../shared/constants/constantTypes";

export type Category = "melee" | "ranged" | "magic";

export interface Weapon {
  _id?: string;
  name: string;
  description: string;
  category: Category;
  quality: Quality[];
  rarity: Rarity;
  materials: Materials[];
  value: number;
  statModifiers: StatModifier[];
  damageType: DamageType[];
  properties: Properties[];
  skills: string[];
  uniqueSkills: string[];
}
