import { useContext } from "react";
import { SpellContext } from "../context/SpellContext";
import { SpellPreview } from "./SpellPreview";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";

export const SpellList = () => {
  const { spellList } = useContext(SpellContext);
  if (!spellList || spellList.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <SpellPreview />
        </div>
      </div>
    </>
  );
};
