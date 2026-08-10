import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  EffectType,
  DamageType,
  OffensiveStat,
  Rarity,
  Quality,
  Materials,
  Properties,
} from "../constants/constantTypes";

interface Constants {
  PROFESSIONS: string[];
  AFFINITIES: string[];

  CONDITIONS: string[];
  STATS: Record<string, string>;
  OFFENSIVE_STATS: OffensiveStat[];
  EFFECT_TYPES: EffectType[];
  DAMAGE_TYPES: DamageType[];
  SKILLS: Record<string, string>;

  RARITY: Rarity;
  QUALITY: Quality[];
  MATERIALS: Materials[];

  PROPERTIES: Properties[];
}

export const constantsApi = createApi({
  reducerPath: "constantsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getConstants: builder.query<Constants, void>({
      query: () => "/api/constants",
    }),
  }),
});

export const { useGetConstantsQuery } = constantsApi;
