import { useState } from "react";
import { CharacterSectionProps } from "../charactersTypes";

const RESOURCE_BARS = [
  {
    label: "HP",
    currentKey: "hpCurrent",
    maxKey: "hpMax",
    color: "text-red-500 dark:text-red-400",
    border: "border-red-200 dark:border-red-700/40",
    bg: "bg-red-50 dark:bg-red-900/10",
    labelColor: "text-red-600 dark:text-red-500",
    barClasses: "bg-red-400 dark:bg-red-500",
  },
  {
    label: "MP",
    currentKey: "mpCurrent",
    maxKey: "mpMax",
    color: "text-blue-500 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-700/40",
    bg: "bg-blue-50 dark:bg-blue-900/10",
    labelColor: "text-blue-600 dark:text-blue-500",
    barClasses: "bg-blue-400 dark:bg-blue-500",
  },
  {
    label: "Momentum",
    currentKey: "momCurrent",
    maxKey: "momMax",
    color: "text-yellow-500 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-700/40",
    bg: "bg-yellow-50 dark:bg-yellow-900/10",
    labelColor: "text-yellow-600 dark:text-yellow-500",
    barClasses: "bg-yellow-400 dark:bg-yellow-500",
  },
] as const;

// stats + display info in one place — no more find()-ing between two arrays
const STAT_GROUPS = [
  {
    label: "Offense",
    header: "text-orange-600 dark:text-orange-400",
    card: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700/40",
    labelClasses: "text-orange-500 dark:text-orange-500",
    valueClasses: "text-orange-700 dark:text-orange-300",
    stats: [
      { key: "might", label: "Might", signed: true },
      { key: "accuracy", label: "Accuracy", signed: false },
      { key: "dominance", label: "Dominance", signed: false },
    ],
  },
  {
    label: "Defense",
    header: "text-cyan-600 dark:text-cyan-400",
    card: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700/40",
    labelClasses: "text-cyan-500 dark:text-cyan-500",
    valueClasses: "text-cyan-700 dark:text-cyan-300",
    stats: [
      { key: "resilience", label: "Resilience", signed: false },
      { key: "evasion", label: "Evasion", signed: false },
      { key: "resolve", label: "Resolve", signed: false },
    ],
  },
  {
    label: "Mobility",
    header: "text-green-600 dark:text-green-400",
    card: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50",
    labelClasses: "text-green-400 dark:text-green-500",
    valueClasses: "text-green-700 dark:text-green-300",
    stats: [
      { key: "movement", label: "Movement", signed: false },
      { key: "initiative", label: "Initiative", signed: false },
    ],
  },
] as const;

export const CharacterStats = ({
  formData,
  patchForm,
}: CharacterSectionProps) => {
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <>
      {/* Resource Row */}
      <div className="flex gap-2 mb-3">
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
            const max = formData[maxKey] || 0;
            const current = formData[currentKey] || 0;
            const percent = max > 0 ? (current / max) * 100 : 0;

            return (
              <div
                key={label}
                className={`flex-1 ${bg} border ${border} rounded-xl px-4 py-2.5 flex items-center justify-between`}
              >
                <div className="flex-1 mr-4">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <p
                      className={`text-[9px] font-bold uppercase tracking-widest ${labelColor}`}
                    >
                      {label}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
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
                              patchForm({ [currentKey]: clamped });
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
                                patchForm({ [currentKey]: clamped });
                                setEditing(null);
                              }
                              if (e.key === "Escape") setEditing(null);
                            }}
                            className="w-12 text-center text-base font-extrabold bg-transparent border-b border-current outline-none"
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
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
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
                      patchForm({
                        [currentKey]: Math.max(0, Math.min(max, current + 1)),
                      })
                    }
                    className="w-6 h-5 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/40 rounded text-[10px] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500 transition-colors leading-none flex items-center justify-center"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      patchForm({
                        [currentKey]: Math.max(0, Math.min(max, current - 1)),
                      })
                    }
                    className="w-6 h-5 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/40 rounded text-[10px] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500 transition-colors leading-none flex items-center justify-center"
                  >
                    ▼
                  </button>
                </div>
              </div>
            );
          },
        )}
      </div>

      {/* Stat Grid */}
      <div className="flex gap-3 mb-3">
        {STAT_GROUPS.map(
          ({ label, header, card, labelClasses, valueClasses, stats }) => (
            <div key={label} className="flex-1">
              <p
                className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 ${header}`}
              >
                {label}
              </p>
              <div
                className={`grid gap-1.5 ${stats.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
              >
                {stats.map(({ key, label: statLabel, signed }) => {
                  const value = formData[key] ?? 0;
                  return (
                    <div
                      key={key}
                      className={`rounded-lg p-2 text-center border transition-all duration-200 ${card}`}
                    >
                      <p
                        className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${labelClasses}`}
                      >
                        {statLabel}
                      </p>
                      <p
                        className={`text-lg font-extrabold leading-none ${valueClasses}`}
                      >
                        {signed && value >= 0 ? "+" : ""}
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
};
