export function FeaturesTab({ state, library, onToggleFeat }) {
  const pool = getPool({
    mode: state.mode,
    cls: state.cls,
    sources: state.sources,
    library,
  });

  if (!pool.length) {
    return (
      <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
        {state.mode === "classed"
          ? "Choose a class to see features."
          : "Select a power source."}
      </p>
    );
  }

  return (
    <>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        {state.selectedFeats.length} / 3 selected
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {pool.map((f) => {
          const sel = state.selectedFeats.includes(f.name);
          const maxed = state.selectedFeats.length >= 3 && !sel;
          const modStr = f.mods
            ? Object.entries(f.mods)
                .filter(([, v]) => v !== 0)
                .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
                .join("  ")
            : "";

          return (
            <div
              key={f.name}
              onClick={maxed ? undefined : () => onToggleFeat(f.name)}
              className={`rounded-xl p-3 border transition-all duration-200 ${
                maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              } ${
                sel
                  ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
                  : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-cyan-400 dark:hover:border-cyan-500/40 hover:scale-[1.01]"
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <span
                  className={`text-sm font-semibold ${sel ? "text-cyan-600 dark:text-cyan-400" : "text-slate-900 dark:text-white"}`}
                >
                  {f.name}
                </span>
                <div className="flex gap-1 flex-shrink-0">
                  <Tag label={f.type} variant={typeVariant(f.type)} />
                  <Tag label={f.cost} />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {f.desc}
              </p>
              {modStr && (
                <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-2">
                  {modStr}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
