import { useContext } from "react";
import { ArmorContext } from "../context/ArmorContext";
import { ArmorPreview } from "./ArmorPreview";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";

export const ArmorList = () => {
  const { armorList } = useContext(ArmorContext);
  if (!armorList || armorList.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <ArmorPreview />
        </div>
      </div>
    </>
  );
};
