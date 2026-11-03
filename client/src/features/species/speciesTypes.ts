import {
  DamageType,
  StatModifier,
} from "../../shared/constants/constantTypes";

export type ResistanceRule =
  | "resistance"
  | "vulnerability"
  | "immunity"
  | "absorption";

export interface Resistance {
  damageType: DamageType | "";
  rule: ResistanceRule | "";
}

export interface Species {
  _id?: string;
  name: string;
  description: string;

  statModifiers: StatModifier[];
  resistances: Resistance[];

  // Power ids — only powers with kind "trait"
  traits: string[];
}
