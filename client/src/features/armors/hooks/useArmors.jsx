import { useContext } from "react";
import { ArmorContext } from "../context/ArmorContext";

export const useArmors = () => {
  const context = useContext(ArmorContext);

  if (!context) {
    throw new Error("useArmors must be used within a ArmorContextProvider");
  }

  return context;
};
