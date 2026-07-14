const SectionLabel = ({ children }) => (
  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-white-400 mb-2">
    {children}
  </p>
);

export const CharacterArchetype = ({ formData, patchForm, library }) => {
  const selectClasses =
    "bg-transparent border-none text-slate-900 dark:text-white text-xs font-semibold outline-none cursor-pointer w-full mt-0.5 leading-tight";

  const fieldClasses =
    "bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-3 py-2 flex flex-col justify-center min-w-0";

  return (
    <div className="flex items-stretch gap-2 mb-3 flex-wrap">
      {/* Mode pill toggle */}
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-0.5 flex gap-0.5 flex-shrink-0 self-stretch items-center">
        {["classed", "classless"].map((m) => (
          <button
            type="button"
            key={m}
            onClick={() => patchForm({ mode: m })}
            className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all duration-150 ${
              formData.mode === m
                ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {m === "classed" ? "Classed" : "Classless"}
          </button>
        ))}
      </div>

      {/* Species */}
      <div className={`${fieldClasses} flex-1 min-w-[90px]`}>
        <SectionLabel>Species</SectionLabel>
        <select
          className={selectClasses}
          value={formData.species}
          onChange={(e) => patchForm({ species: e.target.value })}
        >
          <option value="">—</option>
          {library?.species?.map((s) => (
            <option key={s._id || s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Background */}
      <div className={`${fieldClasses} flex-1 min-w-[90px]`}>
        <SectionLabel>Background</SectionLabel>
        <select
          className={selectClasses}
          value={formData.background}
          onChange={(e) => patchForm({ background: e.target.value })}
        >
          <option value="">—</option>
          {library?.backgrounds?.map((b) => (
            <option key={b._id || b.name} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Classed: Primary Class */}
      {formData.mode === "classed" && (
        <div className={`${fieldClasses} flex-1 min-w-[100px]`}>
          <SectionLabel>Class</SectionLabel>
          <select
            className={selectClasses}
            value={formData.profession}
            onChange={(e) =>
              patchForm({
                profession: e.target.value,
                subProfession: "",
                selectedFeats: [],
              })
            }
          >
            <option value="">—</option>
            {library?.professions?.map((p) => (
              <option key={p._id || p.title} value={p.title}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Classed: Dip */}
      {formData.mode === "classed" && (
        <div className={`${fieldClasses} flex-1 min-w-[100px]`}>
          <SectionLabel>Dip</SectionLabel>
          <select
            className={selectClasses}
            value={formData.subProfession}
            onChange={(e) => patchForm({ subProfession: e.target.value })}
          >
            <option value="">None</option>
            {library?.professions
              .filter((p) => p.title !== formData.profession)
              ?.map((p) => (
                <option key={p._id || p.title} value={p.title}>
                  {p.title}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Classless: Power Source */}
      {formData.mode === "classless" && (
        <div className={`${fieldClasses} flex-1 min-w-[110px]`}>
          <SectionLabel>Power Source</SectionLabel>
          <select
            className={selectClasses}
            value={formData.affinity}
            onChange={(e) => {
              patchForm({ affinity: e.target.value, selectedFeats: [] });
            }}
          >
            <option value="">—</option>
            {library?.affinities?.map((s) => (
              <option key={s._id || s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
