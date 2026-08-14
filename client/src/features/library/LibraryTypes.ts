import { Spell } from "../spells/spellTypes";
import { Weapon } from "../weapons/weaponTypes";
import {
  Affinities,
  Armor,
  Background,
  Profession,
  Species,
  Traits,
} from "../../shared/constants/constantTypes";

export interface LibraryFormData {
  affinities: Affinities[];
  armors: Armor[];
  backgrounds: Background;
  professions: Profession;
  species: Species[];
  spells: Spell[];
  traits: Traits[];
  weapons: Weapon[];
}
