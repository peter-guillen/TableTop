import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ArmorPage = () => {
  const message = useContext(ThemeContext);
  return (
    <div>
      <div>Armor</div>
      <div>{message}</div>
    </div>
  );
};

export default ArmorPage;
