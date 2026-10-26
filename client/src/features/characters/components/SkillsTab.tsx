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
                ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
                : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-cyan-300 dark:hover:border-cyan-500/40"
            } ${maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
