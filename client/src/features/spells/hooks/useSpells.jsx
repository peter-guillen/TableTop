import { useContext } from "react";
import { SpellContext } from "../context/SpellContext";

export const useSpells = () => {
  const context = useContext(SpellContext);

  if (!context) {
    throw new Error("useSpells must be used within a SpellContextProvider");
  }

  return context;
};
