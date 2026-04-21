const SOURCES = ["Arcane", "Natural", "Psionic", "Divine", "Blood", "Chi"];

const SectionLabel = ({ children }) => (
  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
    {children}
  </p>
);

export const CharacterArchetype = ({ state, set, setMode, library }) => {
  const races = library?.races || [];
  const bgs = library?.backgrounds || [];
  const classes = library?.professions || [];

  const selectCls =
    "bg-transparent border-none text-slate-900 dark:text-white text-xs font-semibold outline-none cursor-pointer w-full mt-0.5 leading-tight";

  const fieldCls =
    "bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-3 py-2 flex flex-col justify-center min-w-0";

  return (
    <div className="flex items-stretch gap-2 mb-3 flex-wrap">
      {/* Mode pill toggle */}
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-0.5 flex gap-0.5 flex-shrink-0 self-stretch items-center">
        {["classed", "classless"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all duration-150 ${
              state.mode === m
                ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {m === "classed" ? "Classed" : "Classless"}
          </button>
        ))}
      </div>

      {/* Race */}
      <div className={`${fieldCls} flex-1 min-w-[90px]`}>
        <SectionLabel>Race</SectionLabel>
        <select
          className={selectCls}
          value={state.race}
          onChange={(e) => set({ race: e.target.value })}
        >
          <option value="">—</option>
          {races.map((r) => (
            <option key={r._id || r.name}>{r.name}</option>
          ))}
        </select>
      </div>

      {/* Background */}
      <div className={`${fieldCls} flex-1 min-w-[90px]`}>
        <SectionLabel>Background</SectionLabel>
        <select
          className={selectCls}
          value={state.bg}
          onChange={(e) => set({ bg: e.target.value })}
        >
          <option value="">—</option>
          {bgs.map((b) => (
            <option key={b._id || b.name}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Classed: Primary Class */}
      {state.mode === "classed" && (
        <div className={`${fieldCls} flex-1 min-w-[100px]`}>
          <SectionLabel>Class</SectionLabel>
          <select
            className={selectCls}
            value={state.cls}
            onChange={(e) =>
              set({ cls: e.target.value, dip: "", selectedFeats: [] })
            }
          >
            <option value="">—</option>
            {classes.map((p) => (
              <option key={p._id || p.title}>{p.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* Classed: Dip */}
      {state.mode === "classed" && (
        <div className={`${fieldCls} flex-1 min-w-[100px]`}>
          <SectionLabel>Dip</SectionLabel>
          <select
            className={selectCls}
            value={state.dip}
            onChange={(e) => set({ dip: e.target.value })}
          >
            <option value="">None</option>
            {classes
              .filter((p) => p.title !== state.cls)
              .map((p) => (
                <option key={p._id || p.title}>{p.title}</option>
              ))}
          </select>
        </div>
      )}

      {/* Classless: Power Source */}
      {state.mode === "classless" && (
        <div className={`${fieldCls} flex-1 min-w-[110px]`}>
          <SectionLabel>Power Source</SectionLabel>
          <select
            className={selectCls}
            value={state.sources[0] || ""}
            onChange={(e) => {
              const src = e.target.value;
              set({ sources: src ? [src] : [], selectedFeats: [] });
            }}
          >
            <option value="">—</option>
            {SOURCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
