const ARMOR = [
  { key: "Light", label: "Light Armor", def: 1 },
  { key: "Medium", label: "Medium Armor", def: 2 },
  { key: "Heavy", label: "Heavy Armor", def: 4 },
  { key: "Robes", label: "Arcane Robes", def: 0 },
];

const SectionLabel = ({ children }) => (
  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
    {children}
  </p>
);

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

function getPool({ mode, cls, sources, library }) {
  if (mode === "classed") {
    return (library?.features || []).filter((f) => f.profession === cls);
  }
  return (library?.features || []).filter((f) => sources.includes(f.src));
}

function typeVariant(type = "") {
  if (type === "Passive") return "innate";
  if (type === "Major Action") return "learned";
  if (type === "Minor Action") return "neutral";
  if (type === "Reaction") return "reaction";
  return "neutral";
}

const Row = ({ label, value }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
    <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
    <span className="text-xs font-semibold text-slate-900 dark:text-white">
      {value || "—"}
    </span>
  </div>
);

export const CharacterOverview = ({ state, stats, library }) => {
  const pool = getPool({
    mode: state.mode,
    cls: state.cls,
    sources: state.sources,
    library,
  });

  const armorLabel = state.selectedArmor
    ? ARMOR.find((a) => a.key === state.selectedArmor)?.label
    : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Identity */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4">
        <SectionLabel>Identity</SectionLabel>
        <Row label="Race" value={state.race} />
        <Row label="Background" value={state.bg} />
        <Row
          label="Mode"
          value={state.mode === "classless" ? "Classless" : "Classed"}
        />
        {state.mode === "classed" && <Row label="Class" value={state.cls} />}
        {state.mode === "classed" && state.dip && (
          <Row label="Dip" value={state.dip} />
        )}
        {state.mode === "classless" && state.sources[0] && (
          <Row label="Source" value={state.sources[0]} />
        )}
      </div>

      {/* Loadout */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4">
        <SectionLabel>Loadout</SectionLabel>
        <Row label="Weapon" value={state.selectedWeapon} />
        <Row label="Armor" value={armorLabel} />
      </div>

      {/* Active modifiers */}
      {stats?.modSources?.length > 0 && (
        <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4">
          <SectionLabel>Stat Modifiers</SectionLabel>
          {stats?.modSources.map((m, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0"
            >
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {m.label}
              </span>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                +{m.val} {m.key.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Selected powers */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4 flex-1">
        <SectionLabel>
          Selected Powers ({state.selectedFeats?.length}/3)
        </SectionLabel>
        {state.selectedFeats?.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-xs italic text-slate-400 dark:text-slate-500">
              No powers selected yet.
            </p>
            <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-1">
              Pick up to 3 from Features or Powers.
            </p>
          </div>
        ) : (
          state?.selectedFeats?.map((name) => {
            const f = pool.find((x) => x.name === name);
            return (
              <div
                key={name}
                className="py-3 border-b border-slate-100 dark:border-slate-700/40 last:border-0"
              >
                <div className="flex justify-between items-start gap-1 mb-1">
                  <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                    {name}
                  </p>
                  {f && <Tag label={f.type} variant={typeVariant(f.type)} />}
                </div>
                {f && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {f.desc}
                  </p>
                )}
                {f?.cost && (
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                    Cost: {f.cost}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
