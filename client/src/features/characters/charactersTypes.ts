import {
  Affinities,
  Background,
  Profession,
  Species,
} from "../../shared/constants/constantTypes";

export interface Identity {
  name: string;
  age?: number;
  subjectPronoun?: string;
  objectPronoun?: string;
  portrait?: string;
}

export interface Origin {
  species?: Species;
  background?: Background;
}

export interface Archetype {
  profession?: Profession;
  professionSub?: Profession;
  affinity?: Affinities;
  affinitySub?: Affinities;
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
  item: string;
  quantity: number;
}

export interface Equipment {
  weapons: {
    mainHand: string | null;
    offHand: string | null;
  };
  armor: string | null;
  accessories: string[];
}

export interface Powers {
  spells: string[];
  abilities: string[];
  traits: string[];
}

export interface Character {
  _id?: string;
  userId: string;

  identity: Identity;
  origin: Origin;

  mode: "classed" | "classless";

  archetype: Archetype;

  progression: Progression;
  stats: Stats;

  inventory: InventoryItem[];
  equipment: Equipment;
  powers: Powers;

  skills: string[];

  createdAt?: string;
  updatedAt?: string;
}

export type PatchForm = (updated: Partial<Character>) => void;

export interface CharacterSectionProps {
  formData: Character;
  patchForm: PatchForm;
}
