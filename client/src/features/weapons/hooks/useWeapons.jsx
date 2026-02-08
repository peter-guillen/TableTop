import { useContext } from "react";
import { WeaponContext } from "../context/WeaponContext";

export const useWeapons = () => {
  const context = useContext(WeaponContext);

  if (!context) {
    throw new Error("useWeapons must be used within a WeaponContextProvider");
  }

  return context;
};
