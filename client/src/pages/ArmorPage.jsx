import { useContext } from "react";
import { ThemeContext } from "../hooks/themeFastRefreshHook";

export const ArmorPage = () => {
  const message = useContext(ThemeContext);
  return (
    <div>
      <div>Armor</div>
      <div>{message}</div>
    </div>
  );
};
