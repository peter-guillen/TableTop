import { CharacterSectionProps } from "../charactersTypes";

export const CharacterOverview = ({ formData }: CharacterSectionProps) => {
  const { origin, mode, archetype, equipment, powers } = formData;

  const powerGroups = [
    { label: "Spells", items: powers.spells },
    { label: "Abilities", items: powers.abilities },
    { label: "Traits", items: powers.traits },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-3">
      {/* Identity */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
          Identity
        </p>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Species
          </span>
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            {origin.species || "—"}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Background
          </span>
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            {origin.background || "—"}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Mode
          </span>
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            {mode === "classless" ? "Classless" : "Classed"}
          </span>
        </div>
        {mode === "classed" && (
          <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Class
            </span>
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              {archetype.profession || "—"}
            </span>
          </div>
        )}
      </div>

      {/* Loadout */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
          Loadout
        </p>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Main Hand
          </span>
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            {equipment.weapons.mainHand || "—"}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Off Hand
          </span>
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            {equipment.weapons.offHand || "—"}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Armor
          </span>
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            {equipment.armor || "—"}
          </span>
        </div>
      </div>

      {/* Powers */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
          Powers
        </p>
        {powerGroups.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-xs italic text-slate-400 dark:text-slate-500">
              No powers selected yet.
            </p>
          </div>
        ) : (
          powerGroups.map((group) => (
            <div
              key={group.label}
              className="py-3 border-b border-slate-100 dark:border-slate-700/40 last:border-0"
            >
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                {group.label}
              </p>
              {group.items.map((name) => (
                <p
                  key={name}
                  className="text-sm font-bold text-cyan-600 dark:text-cyan-400"
                >
                  {name}
                </p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
