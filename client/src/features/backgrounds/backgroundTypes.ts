import { Skills, StatModifier } from "../../shared/constants/constantTypes";

export interface StartingItem {
  // Item id
  item: string;
  quantity: number;
}

export interface Background {
  _id?: string;
  name: string;
  description: string;

  statModifiers: StatModifier[];
  skillProficiencies: Skills[];
  startingItems: StartingItem[];

  // Power ids — only powers with kind "trait"
  traits: string[];
}
