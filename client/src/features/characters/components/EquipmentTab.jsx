export const EquipmentTab = ({ state, library, onToggleArmor }) => {
  const armor = library?.armor || [];

  if (!armor.length) {
    return (
      <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
        No armor found in library.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {armor.map((a) => {
        const sel = state.selectedArmor === a.key;
        return (
          <div
            key={a._id || a.key}
            onClick={() => onToggleArmor(a.key)}
            className={`rounded-xl p-3 border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
              sel
                ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40"
                : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-orange-300 dark:hover:border-orange-500/30"
            }`}
          >
            <p
              className={`text-sm font-semibold mb-1 ${
                sel
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              {a.label}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              +{a.def} Defense
            </p>
          </div>
        );
      })}
    </div>
  );
};
