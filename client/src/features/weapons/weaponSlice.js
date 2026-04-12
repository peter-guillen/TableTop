import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedWeaponId: null,
  isEditing: false,
  sortBy: "name",
};

const weaponSlice = createSlice({
  name: "weapon",
  initialState,
  reducers: {
    setSelectedWeapon(state, action) {
      state.selectedWeaponId = action.payload;
    },
    toggleEditing(state) {
      state.isEditing = !state.isEditing;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSelectedWeapon, toggleEditing, setSortBy } =
  weaponSlice.actions;
export const weaponReducer = weaponSlice.reducer;
