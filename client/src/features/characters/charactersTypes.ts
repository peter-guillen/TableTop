import {
  Affinities,
  Background,
  Profession,
  Species,
} from "../../shared/constants/constantTypes";

export interface Character {
  name: string;
  mode: "classed" | "classless";
  subPronoun: string;
  objPronoun: string;
  portrait: string | null;
  age: number;
  species: Species;
  background: Background;
  profession: Profession;
  subProfession: Profession;
  affinity: Affinities;
  selectedFeats: string[];
  selectedWeapons: string[];
  selectedSpells: string[];
  selectedSkills: string[];
  selectedTraits: string[];
  selectedArmor: string;
  hpMax: number;
  hpCurrent: number;
  mpMax: number;
  mpCurrent: number;
  momMax: number;
  momCurrent: number;
  attack: number;
  accuracy: number;
  dominance: number;
  defense: number;
  resolve: number;
  resilience: number;
  movement: number;
  initiative: number;
}

export interface CharacterSectionProps {
  formData: Character;
  patchForm: PatchForm;
}

export type PatchForm = (updated: Partial<Character>) => void;
