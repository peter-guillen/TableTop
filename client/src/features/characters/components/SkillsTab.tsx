import type { CharacterSectionProps } from "../charactersTypes";
import { Skills } from "../../../shared/constants/constantTypes";

const SKILL_CAP = 5;

export const SkillsTab = ({
  formData,
  patchForm,
  constants,
}: CharacterSectionProps) => {
  const skillNames = Object.values(constants?.SKILLS ?? {});

  const selected = formData.skills ?? [];

  function toggleSkill(name: Skills) {
    if (selected.includes(name)) {
      patchForm({ skills: selected.filter((s) => s !== name) });
      return;
    }
    if (selected.length >= SKILL_CAP) return;
    patchForm({ skills: [...selected, name] });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skillNames.map((name) => {
        const sel = formData.skills.includes(name);
        const maxed = formData.skills.length >= SKILL_CAP && !sel;
        return (
          <button
            type="button"
            key={name}
            onClick={() => toggleSkill(name)}
            disabled={maxed}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-150 ${
              sel
                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                : "bg-white dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-300 dark:hover:border-emerald-500/40"
            } ${maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
