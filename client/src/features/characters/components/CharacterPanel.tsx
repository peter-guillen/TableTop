import { useState } from "react";

import { EquipmentTab } from "./EquipmentTab";
import { PowersTab } from "./PowersTab";
import { SkillsTab } from "./SkillsTab";

import type { CharacterSectionProps } from "../charactersTypes";

const TABS = ["Equipment", "Powers", "Skills"] as const;
type Tab = (typeof TABS)[number];

export const CharacterPanel = ({
  formData,
  patchForm,
  constants,
}: CharacterSectionProps) => {
  const [currentTab, setCurrentTab] = useState<Tab>("Equipment");

  function renderTab() {
    switch (currentTab) {
      case "Equipment":
        return (
          <EquipmentTab
            formData={formData}
            patchForm={patchForm}
            constants={constants}
          />
        );
      case "Powers":
        return (
          <PowersTab
            formData={formData}
            patchForm={patchForm}
            constants={constants}
          />
        );
      case "Skills":
        return (
          <SkillsTab
            formData={formData}
            patchForm={patchForm}
            constants={constants}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-stone-800 dark:to-stone-900/80 rounded-2xl border border-stone-200 dark:border-stone-700/50 overflow-hidden shadow-sm">
      <div className="flex border-b border-stone-200 dark:border-stone-700/50 bg-stone-50 dark:bg-stone-800/30 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 font-semibold transition-all duration-150 ${
              currentTab === tab
                ? "border-emerald-500 dark:border-emerald-400 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-transparent"
                : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 md:p-5 min-h-80">{renderTab()}</div>
    </div>
  );
};
