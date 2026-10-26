import type { CharacterSectionProps } from "../charactersTypes";

const TRAIT_CAP = 5;

export const TraitsTab = ({
  formData,
  patchForm,
  constants,
}: CharacterSectionProps) => {
  const TRAITS = constants?.TRAITS;
  function toggleTrait(name: string) {
    const selected = formData.powers.traits;
    if (selected.includes(name)) {
      patchForm({
        powers: {
          ...formData.powers,
          traits: selected.filter((t) => t !== name),
        },
      });
      return;
    }
    if (selected.length >= TRAIT_CAP) return;
    patchForm({ powers: { ...formData.powers, traits: [...selected, name] } });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {TRAITS.map((name) => {
        const sel = formData.powers.traits.includes(name);
        const maxed = formData.powers.traits.length >= TRAIT_CAP && !sel;
        return (
          <button
            type="button"
            key={name}
            onClick={() => toggleTrait(name)}
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
