import { useContext } from "react";
import { WeaponContext } from "../context/WeaponContext";
import { WeaponPreview } from "./WeaponPreview";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";

export const WeaponList = () => {
  const { spellList } = useContext(WeaponContext);
  if (!spellList || spellList.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <WeaponPreview />
        </div>
      </div>
    </>
  );
};
