import { Spell } from "../spells/spellTypes";

export type CharacterMode = "classed" | "classless";

export interface ModSource {
  label: string;
  key: string;
  val: number;
}

export interface CharacterFormData {
  name: string;
  mode: CharacterMode;
  subPronoun: string;
  objPronoun: string;
  portrait: string | null;
  age: string;
  species: string;
  background: string;
  profession: string;
  subProfession: string;
  affinity: string;
  selectedFeats: string[];
  selectedWeapons: string[];
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
  modSources: ModSource[];
}

export interface CharacterSectionProps {
  library: LibraryData;
  formData: CharacterFormData;
  patchForm: PatchForm;
}

export type PatchForm = (updated: Partial<CharacterFormData>) => void;

export interface LibraryData {
  affinities: T[];
  armors: T[];
  backgrounds: T[];
  professions: T[];
  species: T[];
  spells: Spell[];
  traits: T[];
  weapons: T[];
}
