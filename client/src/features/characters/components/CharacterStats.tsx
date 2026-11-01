import { useState } from "react";
import type {
  CharacterSectionProps,
  PassiveStatKey,
  ResourceKey,
} from "../charactersTypes";

const RESOURCE_BARS = [
  {
    label: "HP",
    currentKey: "hp",
    maxKey: "hpMax",
    color: "text-red-500 dark:text-red-400",
    border: "border-red-200 dark:border-red-700/40",
    bg: "bg-red-50 dark:bg-red-900/10",
    labelColor: "text-red-600 dark:text-red-500",
    barClasses: "bg-red-400 dark:bg-red-500",
  },
  {
    label: "MP",
    currentKey: "mp",
    maxKey: "mpMax",
    color: "text-blue-500 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-700/40",
    bg: "bg-blue-50 dark:bg-blue-900/10",
    labelColor: "text-blue-600 dark:text-blue-500",
    barClasses: "bg-blue-400 dark:bg-blue-500",
  },
  {
    label: "Momentum",
    currentKey: "mom",
    maxKey: "momMax",
    color: "text-yellow-500 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-700/40",
    bg: "bg-yellow-50 dark:bg-yellow-900/10",
    labelColor: "text-yellow-600 dark:text-yellow-500",
    barClasses: "bg-yellow-400 dark:bg-yellow-500",
  },
] as const;

const STAT_GROUP_STYLES = [
  {
    category: "OFFENSIVE",
    header: "text-orange-600 dark:text-orange-400",
    card: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700/40",
    labelClasses: "text-orange-500 dark:text-orange-500",
    valueClasses: "text-orange-700 dark:text-orange-300",
  },
  {
    category: "DEFENSIVE",
    header: "text-cyan-600 dark:text-cyan-400",
    card: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700/40",
    labelClasses: "text-cyan-500 dark:text-cyan-500",
    valueClasses: "text-cyan-700 dark:text-cyan-300",
  },
  {
    category: "MOBILITY",
    header: "text-green-600 dark:text-green-400",
    card: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50",
    labelClasses: "text-green-400 dark:text-green-500",
    valueClasses: "text-green-700 dark:text-green-300",
  },
] as const;

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
    <div className="bg-white dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700/50 p-3 flex flex-col gap-3">
      {/* Resources */}
      <div className="flex flex-col gap-2">
        {RESOURCE_BARS.map(
          ({
            label,
            currentKey,
            maxKey,
            color,
            border,
            bg,
            labelColor,
            barClasses,
          }) => {
            const max = resources[maxKey] ?? 0;
            const current = resources[currentKey] ?? 0;
            const percent = max > 0 ? (current / max) * 100 : 0;

            return (
              <div
                key={label}
                className={`${bg} border ${border} rounded-lg px-3 py-2 flex items-center gap-2`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <p
                      className={`text-[9px] font-bold uppercase tracking-widest ${labelColor}`}
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
                  <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-700/50 rounded-full overflow-hidden">
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
                    className="w-5 h-4 bg-white dark:bg-stone-700/50 border border-stone-200 dark:border-stone-600/40 rounded text-[8px] text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-500 transition-colors leading-none flex items-center justify-center"
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
                    className="w-5 h-4 bg-white dark:bg-stone-700/50 border border-stone-200 dark:border-stone-600/40 rounded text-[8px] text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-500 transition-colors leading-none flex items-center justify-center"
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
      {STAT_GROUP_STYLES.map(
        ({ category, header, card, labelClasses, valueClasses }) => {
          const { label, stats } = constants.STAT_CATEGORIES[category];
          return (
            <div key={category}>
              <p
                className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${header}`}
              >
                {label}
              </p>
              <div className={`rounded-lg border px-2.5 py-1 ${card}`}>
                {stats.map((key) => {
                  const value = passive[key as PassiveStatKey] ?? 0;
                  const signed = SIGNED_STATS.includes(key);
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between py-0.5"
                    >
                      <span
                        className={`text-[11px] font-semibold ${labelClasses}`}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <span
                        className={`text-sm font-extrabold ${valueClasses}`}
                      >
                        {signed && value >= 0 ? "+" : ""}
                        {value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};
