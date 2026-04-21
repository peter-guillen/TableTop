const POWER_TYPES = ["Passive", "Major Action", "Minor Action", "Reaction"];

const Tag = ({ label, variant = "neutral" }) => {
  const base =
    "text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide whitespace-nowrap";
  const styles = {
    learned: `${base} bg-cyan-100   dark:bg-cyan-800/30   text-cyan-800   dark:text-cyan-300   border-cyan-300   dark:border-cyan-500/40`,
    innate: `${base} bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-500/40`,
    reaction: `${base} bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/40`,
    neutral: `${base} bg-slate-100  dark:bg-slate-700/50  text-slate-500  dark:text-slate-400  border-slate-200  dark:border-slate-600/40`,
  };
  return <span className={styles[variant] || styles.neutral}>{label}</span>;
};

function typeVariant(type = "") {
  if (type === "Passive") return "innate";
  if (type === "Major Action") return "learned";
  if (type === "Minor Action") return "neutral";
  if (type === "Reaction") return "reaction";
  return "neutral";
}

export const PowersTab = ({ state, set, library, onToggleFeat }) => {
  const powers = library?.powers || [];

  const pool =
    state.mode === "classed"
      ? powers.filter((p) => p.profession === state.cls)
      : powers.filter((p) => state.sources.includes(p.src));

  const filtered = pool.filter((p) => p.type === state.innerTab);

  if (!pool.length) {
    return (
      <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
        {state.mode === "classed"
          ? "Choose a class first."
          : "Select a power source."}
      </p>
    );
  }

  return (
    <>
      {/* Type filter pills */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {POWER_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => set({ innerTab: t, expandedPower: null })}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all duration-150 ${
              state.innerTab === t
                ? "bg-orange-50 dark:bg-orange-800/30 border-orange-300 dark:border-orange-500/40 text-orange-700 dark:text-orange-300"
                : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            {t}s
          </button>
        ))}
      </div>

      {/* Power list */}
      {filtered.length === 0 ? (
        <p className="text-sm italic text-slate-400 dark:text-slate-500">
          No {state.innerTab.toLowerCase()}s available.
        </p>
      ) : (
        filtered.map((p) => {
          const open = state.expandedPower === p.name;
          const sel = state.selectedFeats.includes(p.name);
          const maxed = state.selectedFeats.length >= 3 && !sel;
          const modStr = p.mods
            ? Object.entries(p.mods)
                .filter(([, v]) => v !== 0)
                .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
                .join("  ")
            : "";

          return (
            <div
              key={p.name}
              className={`rounded-xl border mb-2 overflow-hidden transition-all duration-200 ${
                sel
                  ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
                  : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
              }`}
            >
              {/* Header row — always visible */}
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
                onClick={() => set({ expandedPower: open ? null : p.name })}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-sm font-semibold ${
                      sel
                        ? "text-cyan-600 dark:text-cyan-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {p.name}
                  </span>
                  <Tag label={p.type} variant={typeVariant(p.type)} />
                  <Tag label={p.cost} />
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-2">
                  {open ? "▲" : "▼"}
                </span>
              </div>

              {/* Expanded detail */}
              {open && (
                <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3">
                    {p.desc}
                  </p>
                  {modStr && (
                    <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-2">
                      {modStr}
                    </p>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFeat(p.name);
                    }}
                    disabled={maxed}
                    className={`mt-3 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                      sel
                        ? "bg-cyan-50 dark:bg-cyan-800/30 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
                        : "bg-white dark:bg-slate-700/40 border-slate-200 dark:border-slate-600/40 text-slate-600 dark:text-slate-300 hover:border-cyan-300 dark:hover:border-cyan-500/40"
                    } ${maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {sel ? "Deselect" : "Select Power"}
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </>
  );
};
