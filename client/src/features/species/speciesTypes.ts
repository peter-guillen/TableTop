import {
  Resistance,
  StatModifier,
} from "../../shared/constants/constantTypes";

export interface Species {
  _id?: string;
  name: string;
  description: string;

  statModifiers: StatModifier[];
  resistances: Resistance[];

  // Power ids — only powers with kind "trait"
  traits: string[];
}
