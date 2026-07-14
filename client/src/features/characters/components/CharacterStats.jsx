import { useState } from "react";
const STAT_MODIFIERS = [
  {
    statKey: "attack",
    label: "Attack",
    format: (v) => (v >= 0 ? "+" : "") + v,
  },
  { statKey: "accuracy", label: "Accuracy", format: (v) => v },
  { statKey: "dominance", label: "Dominance", format: (v) => v },
  { statKey: "defense", label: "Defense", format: (v) => v },
  { statKey: "resolve", label: "Resolve", format: (v) => v },
  { statKey: "resilience", label: "Resilience", format: (v) => v },
  { statKey: "movement", label: "Movement", format: (v) => v },
  { statKey: "initiative", label: "Initiative", format: (v) => v },
  { statKey: "misc", label: "Something", format: (v) => v },
];

const STAT_GROUPS = [
  {
    label: "Offense",
    keys: ["attack", "accuracy", "dominance"],
    header: "text-orange-600 dark:text-orange-400",
    card: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700/40",
    labelClasses: "text-orange-500 dark:text-orange-500",
    valueClasses: "text-orange-700 dark:text-orange-300",
  },
  {
    label: "Defense",
    keys: ["defense", "resolve", "resilience"],
    header: "text-cyan-600 dark:text-cyan-400",
    card: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700/40",
    labelClasses: "text-cyan-500 dark:text-cyan-500",
    valueClasses: "text-cyan-700 dark:text-cyan-300",
  },
  {
    label: "Mobility",
    keys: ["movement", "initiative", "misc"],
    header: "text-green-600 dark:text-green-400",
    card: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50",
    labelClasses: "text-green-400 dark:text-green-500",
    valueClasses: "text-green-700 dark:text-green-300",
  },
];

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
];

export const CharacterStats = ({ formData, patchForm, library }) => {
  const [editing, setEditing] = useState(null);
  function commitEdit(currentKey, maxKey, raw) {
    const max = formData[maxKey] || 0;
    const parsed = parseInt(raw, 10);
    const clamped = isNaN(parsed)
      ? formData[currentKey]
      : Math.max(0, Math.min(max, parsed));
    patchForm({ [currentKey]: clamped });
    setEditing(null);
  }

  // Helper to adjust current resource values with the ▲▼ buttons, ensuring they stay between 0 and their max.
  // e.g. currentKey = "hpCurrent", maxKey = "hpMax", direction = 1 or -1
  function adjust(currentKey, maxKey, direction) {
    const max = formData[maxKey] || 0;
    // Math.max to prevent going below 0,
    const current = Math.max(
      0,
      // Math.min to prevent going above max
      Math.min(max, (formData[currentKey] || 0) + direction),
    );
    // Current is now the new adjusted value, so we patch it to the form
    patchForm({ [currentKey]: current });
  }

  const modKeys = new Set(formData?.modSources?.map((m) => m.currentKey) || []);
  const statMap = Object.fromEntries(
    STAT_MODIFIERS.map(({ statKey, format }) => [
      statKey,
      format(formData[statKey] ?? 0),
    ]),
  );

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
                            onBlur={(e) =>
                              commitEdit(currentKey, maxKey, e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                commitEdit(currentKey, maxKey, e.target.value);
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
                    onClick={() => adjust(currentKey, maxKey, 1)}
                    className="w-6 h-5 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/40 rounded text-[10px] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500 transition-colors leading-none flex items-center justify-center"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => adjust(currentKey, maxKey, -1)}
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
          ({ label, keys, header, card, labelClasses, valueClasses }) => (
            <div key={label} className="flex-1">
              <p
                className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 ${header}`}
              >
                {label}
              </p>
              <div
                className={`grid gap-1.5 ${keys.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
              >
                {keys.map((key) => {
                  const definedStat = STAT_MODIFIERS.find(
                    (d) => d.statKey === key,
                  );
                  const boostedStat = modKeys.has(key);
                  return (
                    <div
                      key={key}
                      className={`rounded-lg p-2 text-center border transition-all duration-200 ${card} ${
                        boostedStat
                          ? "ring-2 ring-cyan-400 dark:ring-cyan-500"
                          : ""
                      }`}
                    >
                      <p
                        className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${labelClasses}`}
                      >
                        {definedStat?.label}
                      </p>
                      <p
                        className={`text-lg font-extrabold leading-none ${valueClasses}`}
                      >
                        {statMap[key]}
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
