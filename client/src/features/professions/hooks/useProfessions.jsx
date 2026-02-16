import { useContext } from "react";
import { ProfessionContext } from "../context/Temp-context";

export const useProfessions = () => {
  const context = useContext(ProfessionContext);

  if (!context) {
    throw new Error(
      "useProfessions must be used within a ProfessionContextProvider",
    );
  }

  return context;
};
