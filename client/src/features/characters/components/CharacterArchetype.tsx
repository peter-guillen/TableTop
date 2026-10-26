import type { CharacterArchetypeProps } from "../charactersTypes";

export const CharacterArchetype = ({
  formData,
  patchForm,
  species,
  backgrounds,
  professions,
}: CharacterArchetypeProps) => {
  const { origin, archetype, mode, powers } = formData;

  const selectClasses =
    "bg-transparent border-none text-slate-900 dark:text-white text-xs font-semibold outline-none cursor-pointer w-full mt-0.5 leading-tight";

  const fieldClasses =
    "bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-3 py-2 flex flex-col justify-center min-w-0";

  return (
    <div className="flex items-stretch gap-2 mb-3 flex-wrap">
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-0.5 flex gap-0.5 flex-shrink-0 self-stretch items-center">
        {(["classed", "classless"] as const).map((m) => (
          <button
            type="button"
            key={m}
            onClick={() =>
              patchForm(
                m === "classless"
                  ? {
                      mode: m,
                      archetype: { ...archetype, profession: undefined },
                      powers: { ...powers, spells: [], traits: [] },
                    }
                  : { mode: m },
              )
            }
            className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all duration-150 ${
              mode === m
                ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {m === "classed" ? "Classed" : "Classless"}
          </button>
        ))}
      </div>

      <div className={`${fieldClasses} flex-1 min-w-[90px]`}>
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
          Species
        </p>
        <select
          required
          className={selectClasses}
          value={origin.species ?? ""}
          onChange={(e) =>
            patchForm({
              origin: { ...origin, species: e.target.value || undefined },
            })
          }
        >
          <option value="">Select species</option>
          {species.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className={`${fieldClasses} flex-1 min-w-[90px]`}>
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
          Background
        </p>
        <select
          required
          className={selectClasses}
          value={origin.background ?? ""}
          onChange={(e) =>
            patchForm({
              origin: { ...origin, background: e.target.value || undefined },
            })
          }
        >
          <option value="">Select background</option>
          {backgrounds.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {mode === "classed" && (
        <div className={`${fieldClasses} flex-1 min-w-[100px]`}>
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Class
          </p>
          <select
            required
            className={selectClasses}
            value={archetype.profession ?? ""}
            onChange={(e) =>
              patchForm({
                archetype: {
                  ...archetype,
                  profession: e.target.value || undefined,
                },
                powers: { ...powers, spells: [], traits: [] },
              })
            }
          >
            <option value="">Select class</option>
            {professions.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
