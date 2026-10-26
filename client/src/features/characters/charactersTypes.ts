import { Skills, Constants } from "../../shared/constants/constantTypes";

export type Id = string;

export interface Identity {
  name: string;
  age?: number;
  subjectPronoun?: string;
  objectPronoun?: string;
  portrait?: string;
}

export interface Origin {
  species?: Id;
  background?: Id;
}

export interface Archetype {
  profession?: Id;
  affinity?: Id;
}

export interface Progression {
  level: number;
}

export interface PassiveStats {
  might: number;
  resilience: number;
  accuracy: number;
  evasion: number;
  dominance: number;
  resolve: number;
}

export interface Resources {
  hp?: number;
  mp?: number;
  momentum: number;
}

export interface Stats {
  passive: PassiveStats;
  resources: Resources;
}

export interface InventoryItem {
  item: Id;
  quantity: number;
}

export interface Equipment {
  weapons: {
    mainHand: Id | null;
    offHand: Id | null;
  };
  armor: Id | null;
  accessories: Id[];
}

export interface Powers {
  spells: Id[];
  abilities: Id[];
  traits: Id[];
}

export interface CharacterInput {
  identity: Identity;
  origin: Origin;
  mode: "classed" | "classless";
  archetype: Archetype;
  progression: Progression;
  stats: Stats;
  inventory: InventoryItem[];
  equipment: Equipment;
  powers: Powers;
  skills: Skills[];
}

export interface Character extends CharacterInput {
  _id: Id;
  userId: Id;
  createdAt: string;
  updatedAt: string;
}

export type PatchForm = (updated: Partial<CharacterInput>) => void;

export interface CharacterBaseProps {
  formData: CharacterInput;
  patchForm: PatchForm;
}

export interface CharacterSectionProps extends CharacterBaseProps {
  constants: Constants;
}

export interface RefOption {
  _id: Id;
  name: string;
}

export interface CharacterArchetypeProps extends CharacterBaseProps {
  species: RefOption[];
  backgrounds: RefOption[];
  professions: RefOption[];
}
