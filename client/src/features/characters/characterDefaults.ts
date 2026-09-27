import {
  Archetype,
  Character,
  Identity,
  Origin,
  Stats,
} from "./charactersTypes";
import { Species } from "../../shared/constants/constantTypes";

export const defaultIdentity: Identity = {
  name: "",
  age: 30,
  subjectPronoun: "they",
  objectPronoun: "them",
  portrait: "",
};

export const defaultOrigin: Origin = {
  species: "Human",
  background: "Soldier",
};

export const defaultArchetype: Archetype = {
  profession: "Knight",
  professionSub: "Warrior",
  affinity: "Martial",
  affinitySub: "Chi",
};

export const defaultStats: Stats = {
  passive: {
    might: 0,
    resilience: 0,
    accuracy: 0,
    evasion: 0,
    dominance: 0,
    resolve: 0,
  },
  resources: {
    hp: 10,
    mp: 20,
    momentum: 5,
  },
};

export const defaultCharacterFormData: Character = {
  userId: "",
  identity: defaultIdentity,

  mode: "classed",

  origin: defaultOrigin,
  archetype: defaultArchetype,

  progression: { level: 1 },

  stats: defaultStats,

  inventory: [],
  equipment: {
    weapons: { mainHand: null, offHand: null },
    armor: null,
    accessories: [],
  },
  powers: {
    spells: [],
    abilities: [],
    traits: [],
  },
  skills: [],
};
