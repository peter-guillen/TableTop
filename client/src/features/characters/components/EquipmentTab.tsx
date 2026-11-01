import { WeaponsTab } from "./WeaponsTab";
import { ArmorsTab } from "./ArmorsTab";

import type { CharacterSectionProps } from "../charactersTypes";

export const EquipmentTab = ({
  formData,
  patchForm,
  constants,
}: CharacterSectionProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
          Weapons
        </p>
        <WeaponsTab
          formData={formData}
          patchForm={patchForm}
          constants={constants}
        />
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
          Armor
        </p>
        <ArmorsTab
          formData={formData}
          patchForm={patchForm}
          constants={constants}
        />
      </div>
    </div>
  );
};
