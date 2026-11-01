import type {
  Archetype,
  CharacterInput,
  Identity,
  Origin,
  Progression,
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

export const defaultProgression: Progression = {
  level: 1,
  claimedLevel: 0,
  powerSlots: { spells: 3, abilities: 3, traits: 3 },
};

export const defaultStats: Stats = {
  passive: {
    might: 0,
    resilience: 0,
    accuracy: 0,
    evasion: 0,
    dominance: 0,
    resolve: 0,
    movement: 0,
    initiative: 0,
  },
  resources: {
    hp: 10,
    hpMax: 10,
    mp: 20,
    mpMax: 20,
    mom: 5,
    momMax: 5,
  },
};

export const defaultCharacterFormData: CharacterInput = {
  identity: defaultIdentity,
  mode: "classed",
  origin: defaultOrigin,
  archetype: defaultArchetype,
  progression: defaultProgression,
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
