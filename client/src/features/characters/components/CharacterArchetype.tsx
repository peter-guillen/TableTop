import type { CharacterArchetypeProps } from "../charactersTypes";
import { defaultProgression, defaultStats } from "../characterDefaults";

export const CharacterArchetype = ({
  formData,
  patchForm,
  species,
  backgrounds,
  professions,
}: CharacterArchetypeProps) => {
  const { origin, archetype, mode, progression, powers } = formData;

  // Changing track wipes claimed rewards, so ask first once there is progress to lose
  const hasProgress =
    progression.claimedLevel > 0 ||
    progression.level > 1 ||
    powers.spells.length + powers.abilities.length + powers.traits.length > 0;
  const confirmReset = () =>
    !hasProgress ||
    window.confirm(
      "Changing this resets level, powers and stats back to the start. Continue?",
    );

  const selectClasses =
    "bg-transparent border-none text-stone-900 dark:text-white text-xs font-semibold outline-none cursor-pointer w-full mt-0.5 leading-tight";

  const fieldClasses =
    "bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 rounded-lg px-3 py-2 flex flex-col justify-center min-w-0";

  return (
    <div className="flex items-stretch gap-2 flex-wrap">
      <div className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/50 rounded-lg p-0.5 flex gap-0.5 flex-shrink-0 self-stretch items-center">
        {(["classed", "classless"] as const).map((m) => (
          <button
            type="button"
            key={m}
            onClick={() => {
              if (m === mode || !confirmReset()) return;
              // Switching tracks restarts progression, since claimed rewards came from the old track
              patchForm({
                mode: m,
                archetype: { ...archetype, profession: undefined },
                progression: defaultProgression,
                stats: defaultStats,
                powers: { spells: [], abilities: [], traits: [] },
              });
            }}
            className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all duration-150 ${
              mode === m
                ? "bg-white dark:bg-stone-600 text-stone-900 dark:text-white shadow-sm"
                : "text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
            }`}
          >
            {m === "classed" ? "Classed" : "Classless"}
          </button>
        ))}
      </div>

      <div className={`${fieldClasses} flex-1 min-w-[90px]`}>
        <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
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
        <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
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
          <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
            Class
          </p>
          <select
            required
            className={selectClasses}
            value={archetype.profession ?? ""}
            onChange={(e) => {
              if (!confirmReset()) return;
              patchForm({
                archetype: {
                  ...archetype,
                  profession: e.target.value || undefined,
                },
                progression: defaultProgression,
                stats: defaultStats,
                powers: { spells: [], abilities: [], traits: [] },
              });
            }}
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
