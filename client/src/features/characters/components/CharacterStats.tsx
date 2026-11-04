import { useState } from "react";
import type {
  CharacterSectionProps,
  PassiveStatKey,
  ResourceKey,
} from "../charactersTypes";

// Resources keep a color each (HP red, MP blue, Momentum amber) so they
// read at a glance; everything else on the sheet stays stone
const RESOURCE_BARS = [
  {
    label: "HP",
    currentKey: "hp",
    maxKey: "hpMax",
    color: "text-red-600 dark:text-red-400",
    labelColor: "text-red-700 dark:text-red-400",
    barClasses: "bg-red-500",
  },
  {
    label: "MP",
    currentKey: "mp",
    maxKey: "mpMax",
    color: "text-blue-600 dark:text-blue-400",
    labelColor: "text-blue-700 dark:text-blue-400",
    barClasses: "bg-blue-500",
  },
  {
    label: "Momentum",
    currentKey: "mom",
    maxKey: "momMax",
    color: "text-amber-700 dark:text-amber-400",
    labelColor: "text-amber-700 dark:text-amber-400",
    barClasses: "bg-amber-500",
  },
] as const;

const STAT_GROUPS = ["OFFENSIVE", "DEFENSIVE", "MOBILITY"] as const;

const SIGNED_STATS: string[] = ["might"];

export const CharacterStats = ({
  formData,
  patchForm,
  constants,
}: CharacterSectionProps) => {
  const [editing, setEditing] = useState<ResourceKey | null>(null);
  const { passive, resources } = formData.stats;

  function setResource(key: ResourceKey, value: number) {
    patchForm({
      stats: {
        ...formData.stats,
        resources: { ...resources, [key]: value },
      },
    });
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-3 flex flex-col gap-3">
      {/* Resources */}
      <div className="flex flex-col gap-2">
        {RESOURCE_BARS.map(
          ({ label, currentKey, maxKey, color, labelColor, barClasses }) => {
            const max = resources[maxKey] ?? 0;
            const current = resources[currentKey] ?? 0;
            const percent = max > 0 ? (current / max) * 100 : 0;

            return (
              <div
                key={label}
                className="bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 rounded-lg px-3 py-2 flex items-center gap-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-widest ${labelColor}`}
                    >
                      {label}
                    </p>
                    <p className="text-[11px] text-stone-400 dark:text-stone-500">
                      <span className={`text-base font-extrabold ${color}`}>
                        {editing === currentKey ? (
                          <input
                            autoFocus
                            type="number"
                            defaultValue={current}
                            onBlur={(e) => {
                              const parsed = parseInt(e.target.value, 10);
                              const clamped = isNaN(parsed)
                                ? current
                                : Math.max(0, Math.min(max, parsed));
                              setResource(currentKey, clamped);
                              setEditing(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const parsed = parseInt(
                                  e.currentTarget.value,
                                  10,
                                );
                                const clamped = isNaN(parsed)
                                  ? current
                                  : Math.max(0, Math.min(max, parsed));
                                setResource(currentKey, clamped);
                                setEditing(null);
                              }
                              if (e.key === "Escape") setEditing(null);
                            }}
                            className="w-10 text-center text-base font-extrabold bg-transparent border-b border-current outline-none"
                          />
                        ) : (
                          <span
                            onClick={() => setEditing(currentKey)}
                            className="cursor-pointer"
                          >
                            {current}
                          </span>
                        )}
                      </span>
                      {" / "}
                      {max}
                    </p>
                  </div>
                  <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barClasses}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setResource(
                        currentKey,
                        Math.max(0, Math.min(max, current + 1)),
                      )
                    }
                    className="w-5 h-4 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-[8px] text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-500 transition-colors leading-none flex items-center justify-center"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setResource(
                        currentKey,
                        Math.max(0, Math.min(max, current - 1)),
                      )
                    }
                    className="w-5 h-4 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-[8px] text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-500 transition-colors leading-none flex items-center justify-center"
                  >
                    ▼
                  </button>
                </div>
              </div>
            );
          },
        )}
      </div>

      {/* Stat groups: rows instead of cards so long names fit the narrow column */}
      {STAT_GROUPS.map((category) => {
        const { label, stats } = constants.STAT_CATEGORIES[category];
        return (
          <div key={category}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1 text-stone-500 dark:text-stone-400">
              {label}
            </p>
            <div className="rounded-lg border px-2.5 py-1 bg-stone-50 dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800">
              {stats.map((key) => {
                const value = passive[key as PassiveStatKey] ?? 0;
                const signed = SIGNED_STATS.includes(key);
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between py-1"
                  >
                    <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                      {signed && value >= 0 ? "+" : ""}
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
