import {
  Affinities,
  Background,
  Profession,
  Species,
  Traits,
} from "../../shared/constants/constantTypes";

export interface LibraryFormData {
  affinities: Affinities[];
  backgrounds: Background;
  professions: Profession;
  species: Species[];
  traits: Traits[];
}
