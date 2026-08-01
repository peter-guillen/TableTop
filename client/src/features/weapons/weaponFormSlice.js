import { createSlice } from "@reduxjs/toolkit";
import { formReducers } from "../../shared/hooks/useFormHandlers";
import { defaultWeaponFormData } from "./weaponDefaults";

const weaponFormSlice = createSlice({
  name: "weaponFormSlice",
  defaultWeaponFormData,
  reducers: {
    ...formReducers,
  },
});

export const { updateField, toggleArrayItem, updateObjectField, resetForm } =
  weaponFormSlice.actions;
export const weaponFormReducer = weaponFormSlice.reducer;
