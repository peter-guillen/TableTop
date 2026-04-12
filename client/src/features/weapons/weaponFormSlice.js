import { createSlice } from "@reduxjs/toolkit";
import { formReducers } from "../../shared/hooks/useFormHandlers";

const initialState = {
  // Basic Info
  name: "",
  category: "",
  rarity: "common",
  weight: "",
  value: "",

  // Combat Stats
  damage: "",
  damageType: "",
  range: "",
  properties: [],

  // Requirements & Special
  requirements: {
    strength: 0,
    proficiency: [],
    level: 1,
  },
  skills: [],
  special: "",

  // Description
  description: "",
  tags: [],
};

const weaponFormSlice = createSlice({
  name: "weaponFormSlice",
  initialState,
  reducers: {
    ...formReducers,
  },
});

export const { updateField, toggleArrayItem, updateObjectField, resetForm } =
  weaponFormSlice.actions;
export const weaponFormReducer = weaponFormSlice.reducer;
