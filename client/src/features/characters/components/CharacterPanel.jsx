import { FeaturesTab } from "./FeaturesTab";
import { PowersTab } from "./PowersTab";
import { WeaponsTab } from "./WeaponsTab";
import { SkillsTab } from "./SkillsTab";
import { EquipmentTab } from "./EquipmentTab";

const TABS = ["Features", "Powers", "Weapons", "Skills", "Equipment"];

export const CharacterPanel = ({
  formData,
  patchForm,
  library,
  onToggleFeat,
  onToggleWeapon,
  onToggleArmor,
}) => {
  function renderTab() {
    switch (formData.currentTab) {
      case "Features":
        return (
          <FeaturesTab
            formData={formData}
            library={library}
            onToggleFeat={onToggleFeat}
          />
        );
      case "Powers":
        return (
          <PowersTab
            formData={formData}
            patchForm={patchForm}
            library={library}
            onToggleFeat={onToggleFeat}
          />
        );
      case "Weapons":
        return (
          <WeaponsTab
            formData={formData}
            patchForm={patchForm}
            library={library}
            onToggleWeapon={onToggleWeapon}
          />
        );
      case "Skills":
        return <SkillsTab formData={formData} library={library} />;
      case "Equipment":
        return (
          <EquipmentTab
            formData={formData}
            library={library}
            onToggleArmor={onToggleArmor}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => patchForm({ currentTab: tab })}
            className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 font-semibold transition-all duration-150 ${
              formData.currentTab === tab
                ? "border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-transparent"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600"
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
