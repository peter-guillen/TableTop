import type {
  Archetype,
  CharacterInput,
  Identity,
  Origin,
  Stats,
} from "./charactersTypes";

export const defaultIdentity: Identity = {
  name: "",
  age: 30,
  subjectPronoun: "they",
  objectPronoun: "them",
  portrait: "",
};

export const defaultOrigin: Origin = {};

export const defaultArchetype: Archetype = {};

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

export const defaultCharacterFormData: CharacterInput = {
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
