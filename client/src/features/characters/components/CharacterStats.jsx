const STAT_MODIFIERS = [
  { key: "attack", label: "Attack", fmt: (v) => (v >= 0 ? "+" : "") + v },
  { key: "accuracy", label: "Accuracy", fmt: (v) => v },
  { key: "dominance", label: "Dominance", fmt: (v) => v },
  { key: "defense", label: "Defense", fmt: (v) => v },
  { key: "resolve", label: "Resolve", fmt: (v) => v },
  { key: "resilience", label: "Resilience", fmt: (v) => v },
  { key: "movement", label: "Movement", fmt: (v) => v },
  { key: "initiative", label: "Initiative", fmt: (v) => v },
  { key: "misc", label: "Something", fmt: (v) => v },
];

const STAT_GROUPS = [
  {
    label: "Offense",
    keys: ["attack", "accuracy", "dominance"],
    header: "text-orange-600 dark:text-orange-400",
    card: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700/40",
    labelCls: "text-orange-500 dark:text-orange-500",
    valueCls: "text-orange-700 dark:text-orange-300",
  },
  {
    label: "Defense",
    keys: ["defense", "resolve", "resilience"],
    header: "text-cyan-600 dark:text-cyan-400",
    card: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700/40",
    labelCls: "text-cyan-500 dark:text-cyan-500",
    valueCls: "text-cyan-700 dark:text-cyan-300",
  },
  {
    label: "Mobility",
    keys: ["movement", "initiative", "misc"],
    header: "text-green-500 dark:text-green-400",
    card: "bg-green-50 dark:bg-green-800/50 border-green-200 dark:border-green-700/50",
    labelCls: "text-green-400 dark:text-green-500",
    valueCls: "text-green-700 dark:text-green-300",
  },
];

const resources = [
  {
    label: "HP",
    currentKey: "hpCurrent",
    maxKey: "hp",
    color: "text-orange-500 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-700/40",
    bg: "bg-orange-50 dark:bg-orange-900/10",
    labelColor: "text-orange-600 dark:text-orange-500",
    barCls: "bg-orange-400 dark:bg-orange-500",
  },
  {
    label: "MP",
    currentKey: "mpCurrent",
    maxKey: "mp",
    color: "text-cyan-500 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-700/40",
    bg: "bg-cyan-50 dark:bg-cyan-900/10",
    labelColor: "text-cyan-600 dark:text-cyan-500",
    barCls: "bg-cyan-400 dark:bg-cyan-500",
  },
  {
    label: "Momentum",
    currentKey: "momCurrent",
    maxKey: "momCap",
    color: "text-green-500 dark:text-green-400",
    border: "border-green-200 dark:border-green-700/40",
    bg: "bg-green-50 dark:bg-green-900/10",
    labelColor: "text-green-600 dark:text-green-500",
    barCls: "bg-green-400 dark:bg-green-500",
  },
];

const BASE_STATS = {
  hp: 0,
  hpCurrent: 0,
  mp: 0,
  mpCurrent: 0,
  momCap: 0,
  momCurrent: 0,
  attack: 0,
  accuracy: 0,
  dominance: 0,
  defense: 0,
  resolve: 0,
  resilience: 0,
  movement: 0,
  initiative: 0,
};

export const CharacterStats = ({ library, state, updateInput }) => {
  //
  function adjust(key, maxKey, dir) {
    const max = BASE_STATS[maxKey] || 0;
    const cur = Math.max(0, Math.min(max, (state[key] || 0) + dir));
    updateInput({ [key]: cur });
  }
  const modKeys = new Set(BASE_STATS?.modSources?.map((m) => m.key) || []);
  const statMap = Object.fromEntries(
    STAT_MODIFIERS.map(({ key, fmt }) => [key, fmt(BASE_STATS[key] ?? 0)]),
  );

  console.log(BASE_STATS);
  return (
    <>
      {/* Resource Row */}
      <div className="flex gap-2 mb-3">
        {resources.map(
          ({
            label,
            currentKey,
            maxKey,
            color,
            border,
            bg,
            labelColor,
            barCls,
          }) => {
            const max = BASE_STATS[maxKey] || 0;
            const cur = state[currentKey] || 0;
            const pct = max > 0 ? (cur / max) * 100 : 0;

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
                        {cur}
                      </span>
                      {" / "}
                      {max}
                    </p>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barCls}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => adjust(currentKey, maxKey, 1)}
                    className="w-6 h-5 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/40 rounded text-[10px] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500 transition-colors leading-none flex items-center justify-center"
                  >
                    ▲
                  </button>
                  <button
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
          ({ label, keys, header, card, labelCls, valueCls }) => (
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
                  const def = STAT_MODIFIERS.find((d) => d.key === key);
                  const boosted = modKeys.has(key);
                  return (
                    <div
                      key={key}
                      className={`rounded-lg p-2 text-center border transition-all duration-200 ${card} ${
                        boosted
                          ? "ring-2 ring-offupdateInput-1 ring-cyan-400 dark:ring-cyan-500"
                          : ""
                      }`}
                    >
                      <p
                        className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${labelCls}`}
                      >
                        {def?.label}
                      </p>
                      <p
                        className={`text-lg font-extrabold leading-none ${valueCls}`}
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

// export const CharacterStats = ({ library, state, stats, updateInput }) => {

//   function adjust(key, maxKey, dir) {
//     const max = stats[maxKey] || 0;                              // fix 1
//     const cur = Math.max(0, Math.min(max, (state[key] || 0) + dir));
//     updateInput({ [key]: cur });
//   }

//   const modKeys = new Set(stats?.modSources?.map((m) => m.key) || []);  // fix 2
//   const statMap = Object.fromEntries(
//     STAT_MODIFIERS.map(({ key, fmt }) => [key, fmt(stats[key] ?? 0)]),  // fix 2
//   );

//   return (
//     <>
//       <div className="flex gap-2 mb-3">
//         {resources.map(({ label, currentKey, maxKey, color, border, bg, labelColor, barCls }) => {
//           const max = stats[maxKey] || 0;                        // fix 1
//           const cur = state[currentKey] || 0;
//           const pct = max > 0 ? (cur / max) * 100 : 0;

//           return (
//             <div key={label} className={`flex-1 ${bg} border ${border} rounded-xl px-4 py-2.5 flex items-center justify-between`}>
//               <div className="flex-1 mr-4">
//                 <div className="flex justify-between items-baseline mb-1.5">
//                   <p className={`text-[9px] font-bold uppercase tracking-widest ${labelColor}`}>{label}</p>
//                   <p className="text-[11px] text-slate-400 dark:text-slate-500">
//                     <span className={`text-base font-extrabold ${color}`}>{cur}</span>
//                     {" / "}
//                     {max}
//                   </p>
//                 </div>
//                 <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
//                   <div className={`h-full rounded-full transition-all duration-300 ${barCls}`} style={{ width: `${pct}%` }} />
//                 </div>
//               </div>
//               <div className="flex flex-col gap-0.5">
//                 <button onClick={() => adjust(currentKey, maxKey, 1)} className="w-6 h-5 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/40 rounded text-[10px] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500 transition-colors leading-none flex items-center justify-center">▲</button>
//                 <button onClick={() => adjust(currentKey, maxKey, -1)} className="w-6 h-5 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/40 rounded text-[10px] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500 transition-colors leading-none flex items-center justify-center">▼</button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex gap-3 mb-3">
//         {STAT_GROUPS.map(({ label, keys, header, card, labelCls, valueCls }) => (
//           <div key={label} className="flex-1">
//             <p className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 ${header}`}>{label}</p>
//             <div className={`grid gap-1.5 ${keys.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
//               {keys.map((key) => {
//                 const def = STAT_MODIFIERS.find((d) => d.key === key);
//                 const boosted = modKeys.has(key);
//                 return (
//                   <div key={key} className={`rounded-lg p-2 text-center border transition-all duration-200 ${card} ${boosted ? "ring-2 ring-offset-1 ring-cyan-400 dark:ring-cyan-500" : ""}`}>  {/* fix 3 */}
//                     <p className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${labelCls}`}>{def?.label}</p>
//                     <p className={`text-lg font-extrabold leading-none ${valueCls}`}>{statMap[key]}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
