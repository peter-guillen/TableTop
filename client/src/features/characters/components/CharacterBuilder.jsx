import { useState, useCallback, useEffect } from "react";
import { useGetLibraryItemsQuery } from "../../library/api/libraryApi";
import { SKILLS } from "./Skills";

const SOURCES = ["Arcane", "Natural", "Psionic", "Divine", "Blood", "Chi"];

const TABS = ["Features", "Powers", "Weapons", "Skills", "Equipment"];

const POWER_TYPES = ["Passive", "Major Action", "Minor Action", "Reaction"];

const ARMOR = [
  { key: "Light", label: "Light Armor", def: 1 },
  { key: "Medium", label: "Medium Armor", def: 2 },
  { key: "Heavy", label: "Heavy Armor", def: 4 },
  { key: "Robes", label: "Arcane Robes", def: 0 },
];

const BASE_STATS = {
  Martial: {
    mov: 6,
    atk: 2,
    acc: 8,
    def: 12,
    dom: 6,
    rsl: 8,
    res: 6,
    eva: 1,
    sok: 2,
    momCap: 5,
    hp: 40,
    mp: 10,
    init: 4,
  },
  Sorcerer: {
    mov: 5,
    atk: 1,
    acc: 7,
    def: 10,
    dom: 6,
    rsl: 6,
    res: 5,
    eva: 2,
    sok: 0,
    momCap: 5,
    hp: 28,
    mp: 30,
    init: 3,
  },
  Wizard: {
    mov: 4,
    atk: 1,
    acc: 6,
    def: 9,
    dom: 6,
    rsl: 7,
    res: 4,
    eva: 1,
    sok: 0,
    momCap: 4,
    hp: 24,
    mp: 40,
    init: 2,
  },
  Witch: {
    mov: 5,
    atk: 1,
    acc: 6,
    def: 10,
    dom: 6,
    rsl: 6,
    res: 5,
    eva: 1,
    sok: 1,
    momCap: 4,
    hp: 30,
    mp: 25,
    init: 3,
  },
  Classless: {
    mov: 5,
    atk: 0,
    acc: 5,
    def: 10,
    dom: 6,
    rsl: 5,
    res: 4,
    eva: 0,
    sok: 0,
    momCap: 3,
    hp: 26,
    mp: 20,
    init: 3,
  },
};

const STAT_DEFS = [
  { key: "atk", label: "Attack", fmt: (v) => (v >= 0 ? "+" : "") + v },
  { key: "acc", label: "Accuracy", fmt: (v) => v },
  { key: "dom", label: "Dominance", fmt: (v) => v },
  // { key: "dom", label: "Dominance", fmt: (v) => v + (v >= 0 ? "+10" : "") },
  { key: "def", label: "Defense", fmt: (v) => v },
  { key: "rsl", label: "Resolve", fmt: (v) => v },
  { key: "res", label: "Resilience", fmt: (v) => v },
  { key: "mov", label: "Movement", fmt: (v) => v },
  { key: "init", label: "Initiative", fmt: (v) => v },
  { key: "misc", label: "Something", fmt: (v) => v },
];

const STAT_GROUPS = [
  {
    label: "Offense",
    keys: ["atk", "acc", "dom"],
    header: "text-orange-600 dark:text-orange-400",
    card: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700/40",
    labelCls: "text-orange-500 dark:text-orange-500",
    valueCls: "text-orange-700 dark:text-orange-300",
  },
  {
    label: "Defense",
    keys: ["def", "rsl", "res"],
    header: "text-cyan-600 dark:text-cyan-400",
    card: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700/40",
    labelCls: "text-cyan-500 dark:text-cyan-500",
    valueCls: "text-cyan-700 dark:text-cyan-300",
  },
  {
    label: "Mobility",
    keys: ["mov", "init", "misc"],
    header: "text-green-500 dark:text-green-400",
    card: "bg-green-50 dark:bg-green-800/50 border-green-200 dark:border-green-700/50",
    labelCls: "text-green-400 dark:text-green-500",
    valueCls: "text-green-700 dark:text-green-300",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function computeStats(state, library) {
  const { mode, cls, race, bg, selectedFeats, selectedArmor, sources } = state;
  const baseKey = mode === "classless" ? "Classless" : cls || "Classless";
  const base = { ...(BASE_STATS[baseKey] || BASE_STATS.Classless) };

  const rm = (library?.races || []).find((r) => r.name === race)?.mods || {};
  const bm =
    (library?.backgrounds || []).find((b) => b.name === bg)?.mods || {};

  const mods = {};
  const modSources = [];

  const pool = getPool({ mode, cls, sources, library });
  selectedFeats.forEach((name) => {
    const f = pool.find((x) => x.name === name);
    if (f?.mods) {
      Object.entries(f.mods).forEach(([k, v]) => {
        mods[k] = (mods[k] || 0) + v;
        if (v !== 0) modSources.push({ label: f.name, key: k, val: v });
      });
    }
  });

  const armorDef = ARMOR.find((a) => a.key === selectedArmor)?.def || 0;

  return {
    atk: (base.atk || 0) + (rm.atk || 0) + (bm.atk || 0) + (mods.atk || 0),
    acc: (base.acc || 0) + (mods.acc || 0),
    dom: (base.dom || 0) + (mods.dom || 0),
    def:
      (base.def || 0) +
      (rm.def || 0) +
      (bm.def || 0) +
      (mods.def || 0) +
      armorDef,
    rsl: (base.rsl || 0) + (mods.rsl || 0),
    res: (base.res || 0) + (mods.res || 0),
    eva: (base.eva || 0) + (rm.eva || 0) + (bm.eva || 0) + (mods.eva || 0),
    sok: (base.sok || 0) + (rm.sok || 0) + (bm.sok || 0) + (mods.sok || 0),
    hp: (base.hp || 0) + (rm.hp || 0) + (bm.hp || 0) + (mods.hp || 0),
    mp: (base.mp || 0) + (rm.mp || 0) + (bm.mp || 0) + (mods.mp || 0),
    momCap: base.momCap,
    mov: (base.mov || 0) + (rm.mov || 0) + (bm.mov || 0) + (mods.mov || 0),
    init: (base.init || 0) + (mods.init || 0),
    modSources,
  };
}

// ─── Shared UI atoms ──────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
      {children}
    </p>
  );
}

function Tag({ label, variant = "neutral" }) {
  const base =
    "text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide whitespace-nowrap";
  const styles = {
    learned: `${base} bg-cyan-100   dark:bg-cyan-800/30   text-cyan-800   dark:text-cyan-300   border-cyan-300   dark:border-cyan-500/40`,
    innate: `${base} bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-500/40`,
    reaction: `${base} bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/40`,
    neutral: `${base} bg-slate-100  dark:bg-slate-700/50  text-slate-500  dark:text-slate-400  border-slate-200  dark:border-slate-600/40`,
  };
  return <span className={styles[variant] || styles.neutral}>{label}</span>;
}

function StatCard({ label, value, highlighted }) {
  return (
    <div
      className={`rounded-lg p-2 text-center border transition-all duration-200 ${
        highlighted
          ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
          : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
      }`}
    >
      <p
        className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${
          highlighted
            ? "text-cyan-600 dark:text-cyan-400"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-lg font-extrabold leading-none ${
          highlighted
            ? "text-cyan-600 dark:text-cyan-300"
            : "text-slate-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Sub-component: CharacterHeader ──────────────────────────────────────────

function CharacterHeader({ state, set }) {
  const { subPronoun, objPronoun } = state;
  const pronounDisplay = [subPronoun, objPronoun].filter(Boolean).join("/");

  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 mb-4 items-start">
      <label className="cursor-pointer group">
        <div className="w-[120px] h-[120px] rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/50 flex flex-col items-center justify-center gap-2 group-hover:border-cyan-400 dark:group-hover:border-cyan-500 transition-colors overflow-hidden">
          {state.portrait ? (
            <img
              src={state.portrait}
              alt="Portrait"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate-400 dark:text-slate-500"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="12" cy="9" r="3" />
                <path d="M6 21c0-3.314 2.686-5 6-5s6 1.686 6 5" />
              </svg>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 tracking-wide">
                Portrait
              </span>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => set({ portrait: ev.target.result });
            reader.readAsDataURL(file);
          }}
        />
      </label>

      <div className="flex flex-col gap-2 justify-center h-[120px]">
        <input
          className="bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 pb-1 transition-colors w-full"
          placeholder="Character Name"
          value={state.name}
          onChange={(e) => set({ name: e.target.value })}
        />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Pronouns
          </span>
          <input
            className="w-12 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-md text-xs px-2 py-1 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            placeholder="they"
            value={state.subPronoun}
            onChange={(e) => set({ subPronoun: e.target.value })}
          />
          <input
            className="w-12 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-md text-xs px-2 py-1 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            placeholder="them"
            value={state.objPronoun}
            onChange={(e) => set({ objPronoun: e.target.value })}
          />
          {pronounDisplay && (
            <span className="bg-cyan-100 dark:bg-cyan-800/30 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {pronounDisplay}
            </span>
          )}
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">
            Age
          </span>
          <input
            className="w-12 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-md text-xs px-2 py-1 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            placeholder="—"
            type="number"
            value={state.age}
            onChange={(e) => set({ age: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component: ModeChooser ───────────────────────────────────────────────
// Sits above the identity band as its own prominent row.

// function ModeChooser({ mode, setMode }) {
//   return (
//     <div className="mb-3">
//       <SectionLabel>Character Mode</SectionLabel>
//       <div className="grid grid-cols-2 gap-3">
//         {[
//           {
//             id: "classed",
//             title: "Classed",
//             desc: "Primary class + optional 5-level dip. Tighter class fantasy.",
//           },
//           {
//             id: "classless",
//             title: "Classless",
//             desc: "Choose a single power source. Freeform archetype building.",
//           },
//         ].map((m) => {
//           const active = mode === m.id;
//           return (
//             <button
//               key={m.id}
//               onClick={() => setMode(m.id)}
//               className={`rounded-xl px-5 py-3 border-2 text-left transition-all duration-200 ${
//                 active
//                   ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-400 dark:border-cyan-500"
//                   : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600"
//               }`}
//             >
//               <p
//                 className={`text-sm font-bold mb-0.5 ${active ? "text-cyan-700 dark:text-cyan-300" : "text-slate-900 dark:text-white"}`}
//               >
//                 {m.title}
//               </p>
//               <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-snug">
//                 {m.desc}
//               </p>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// ─── Sub-component: IdentityBand ──────────────────────────────────────────────
// Mode toggle removed. Classless source is now a single-select dropdown in the same band.

// function IdentityBand({ state, set, library }) {
//   const selectCls =
//     "bg-transparent border-none text-cyan-700 dark:text-cyan-300 text-[13px] font-semibold outline-none cursor-pointer w-full";

//   const races = library?.races || [];
//   const bgs = library?.backgrounds || [];
//   const classes = library?.professions || [];

//   // For classless: single source
//   function setSource(src) {
//     set({ sources: src ? [src] : [], selectedFeats: [] });
//   }

//   const colCount = state.mode === "classed" ? 4 : 4; // always 4 columns

//   return (
//     <div className={`grid grid-cols-${colCount} gap-2 mb-3`}>
//       {/* Race */}
//       <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5">
//         <SectionLabel>Race</SectionLabel>
//         <select
//           className={selectCls}
//           value={state.race}
//           onChange={(e) => set({ race: e.target.value })}
//         >
//           <option value="">— choose —</option>
//           {races.length
//             ? races.map((r) => <option key={r._id || r.name}>{r.name}</option>)
//             : ["Human", "Elf", "Dwarf", "Halfling", "Tiefling"].map((r) => (
//                 <option key={r}>{r}</option>
//               ))}
//         </select>
//       </div>

//       {/* Background */}
//       <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5">
//         <SectionLabel>Background</SectionLabel>
//         <select
//           className={selectCls}
//           value={state.bg}
//           onChange={(e) => set({ bg: e.target.value })}
//         >
//           <option value="">— choose —</option>
//           {bgs.length
//             ? bgs.map((b) => <option key={b._id || b.name}>{b.name}</option>)
//             : ["Soldier", "Scholar", "Wanderer", "Acolyte", "Criminal"].map(
//                 (b) => <option key={b}>{b}</option>,
//               )}
//         </select>
//       </div>

//       {/* Classed: primary class */}
//       {state.mode === "classed" && (
//         <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5">
//           <SectionLabel>Primary Class</SectionLabel>
//           <select
//             className={selectCls}
//             value={state.cls}
//             onChange={(e) =>
//               set({ cls: e.target.value, dip: "", selectedFeats: [] })
//             }
//           >
//             <option value="">— choose —</option>
//             {classes.map((p) => (
//               <option key={p._id || p.title}>{p.title}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Classed: dip */}
//       {state.mode === "classed" && (
//         <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5">
//           <SectionLabel>Auxiliary (Dip)</SectionLabel>
//           <select
//             className={selectCls}
//             value={state.dip}
//             onChange={(e) => set({ dip: e.target.value })}
//           >
//             <option value="">None</option>
//             {classes
//               .filter((p) => p.title !== state.cls)
//               .map((p) => (
//                 <option key={p._id || p.title}>{p.title}</option>
//               ))}
//           </select>
//         </div>
//       )}

//       {/* Classless: single power source dropdown */}
//       {state.mode === "classless" && (
//         <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5">
//           <SectionLabel>Power Source</SectionLabel>
//           <select
//             className={selectCls}
//             value={state.sources[0] || ""}
//             onChange={(e) => setSource(e.target.value)}
//           >
//             <option value="">— choose —</option>
//             {SOURCES.map((s) => (
//               <option key={s}>{s}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Classless: 4th slot — empty placeholder to keep grid even, or could show a hint */}
//       {state.mode === "classless" && (
//         <div className="bg-slate-50 dark:bg-slate-800/20 border border-dashed border-slate-200 dark:border-slate-700/30 rounded-xl px-4 py-2.5 flex items-center justify-center">
//           <span className="text-[10px] text-slate-400 dark:text-slate-500 italic text-center leading-snug">
//             One source at
//             <br />a time
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

function IdentityBand({ state, set, library, setMode }) {
  const selectCls =
    "bg-transparent border-none text-slate-900 dark:text-white text-xs font-semibold outline-none cursor-pointer w-full mt-0.5 leading-tight";

  const races = library?.races || [];
  const bgs = library?.backgrounds || [];
  const classes = library?.professions || [];

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
          {(races.length
            ? races.map((r) => r.name)
            : ["Human", "Elf", "Dwarf", "Halfling", "Tiefling"]
          ).map((r) => (
            <option key={r}>{r}</option>
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
          {(bgs.length
            ? bgs.map((b) => b.name)
            : ["Soldier", "Scholar", "Wanderer", "Acolyte", "Criminal"]
          ).map((b) => (
            <option key={b}>{b}</option>
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
}

// ─── Sub-component: ResourceRow ───────────────────────────────────────────────
// Now sits ABOVE the stat grid.

function ResourceRow({ state, stats, set }) {
  function adjust(key, maxKey, dir) {
    const max = stats[maxKey] || 0;
    const cur = Math.max(0, Math.min(max, (state[key] || 0) + dir));
    set({ [key]: cur });
  }

  const resources = [
    {
      label: "HP",
      currentKey: "hpCurrent",
      maxKey: "hp",
      color: "text-orange-500 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-700/40",
      bg: "bg-orange-50 dark:bg-orange-900/10",
      labelColor: "text-orange-600 dark:text-orange-500",
    },
    {
      label: "MP",
      currentKey: "mpCurrent",
      maxKey: "mp",
      color: "text-cyan-500 dark:text-cyan-400",
      border: "border-cyan-200 dark:border-cyan-700/40",
      bg: "bg-cyan-50 dark:bg-cyan-900/10",
      labelColor: "text-cyan-600 dark:text-cyan-500",
    },
    {
      label: "Momentum",
      currentKey: "momCurrent",
      maxKey: "momCap",
      color: "text-green-500 dark:text-green-400",
      border: "border-green-200 dark:border-green-700/40",
      bg: "bg-green-50 dark:bg-green-900/10",
      labelColor: "text-green-600 dark:text-green-500",
    },
  ];

  return (
    <div className="flex gap-2 mb-3">
      {resources.map(
        ({ label, currentKey, maxKey, color, border, bg, labelColor }) => {
          const max = stats[maxKey] || 0;
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
                {/* Progress bar */}
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      label === "HP"
                        ? "bg-orange-400 dark:bg-orange-500"
                        : label === "MP"
                          ? "bg-cyan-400 dark:bg-cyan-500"
                          : "bg-green-400 dark:bg-green-500"
                    }`}
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
  );
}

// ─── Sub-component: StatGrid ──────────────────────────────────────────────────
// HP, MP, Momentum removed — they live in ResourceRow above.

// function StatGrid({ stats }) {
//   const modKeys = new Set(stats.modSources?.map((m) => m.key) || []);
//   return (
//     <div className="grid grid-cols-8 gap-1.5 mb-3">
//       {STAT_DEFS.map(({ key, label, fmt }) => (
//         <StatCard
//           key={key}
//           label={label}
//           value={fmt(stats[key] ?? 0)}
//           highlighted={modKeys.has(key)}
//         />
//       ))}
//     </div>
//   );
// }

function StatGrid({ stats }) {
  const modKeys = new Set(stats.modSources?.map((m) => m.key) || []);
  const statMap = Object.fromEntries(
    STAT_DEFS.map(({ key, fmt }) => [key, fmt(stats[key] ?? 0)]),
  );

  return (
    <div className="flex gap-3 mb-3">
      {STAT_GROUPS.map(({ label, keys, header, card, labelCls, valueCls }) => (
        <div key={label} className={`flex-1`}>
          <p
            className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 ${header}`}
          >
            {label}
          </p>
          <div
            className={`grid gap-1.5 ${keys.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
          >
            {keys.map((key) => {
              const def = STAT_DEFS.find((d) => d.key === key);
              const boosted = modKeys.has(key);
              return (
                <div
                  key={key}
                  className={`rounded-lg p-2 text-center border transition-all duration-200 ${card} ${
                    boosted
                      ? "ring-2 ring-offset-1 ring-cyan-400 dark:ring-cyan-500"
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
      ))}
    </div>
  );
}

// ─── Sub-component: OverviewPanel ─────────────────────────────────────────────
// Replaces the old Sidebar. Larger, always visible, shows identity + selected powers.

function OverviewPanel({ state, stats, library }) {
  const pool = getPool({
    mode: state.mode,
    cls: state.cls,
    sources: state.sources,
    library,
  });
  const armorLabel = state.selectedArmor
    ? ARMOR.find((a) => a.key === state.selectedArmor)?.label
    : null;

  function Row({ label, value }) {
    return (
      <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <span className="text-xs font-semibold text-slate-900 dark:text-white">
          {value || "—"}
        </span>
      </div>
    );
  }

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
      {stats.modSources?.length > 0 && (
        <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4">
          <SectionLabel>Stat Modifiers</SectionLabel>
          {stats.modSources.map((m, i) => (
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

      {/* Selected powers — this is the main real-estate now */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4 flex-1">
        <SectionLabel>
          Selected Powers ({state.selectedFeats.length}/3)
        </SectionLabel>
        {state.selectedFeats.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-xs italic text-slate-400 dark:text-slate-500">
              No powers selected yet.
            </p>
            <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-1">
              Pick up to 3 from Features or Powers.
            </p>
          </div>
        ) : (
          state.selectedFeats.map((name) => {
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
}

// ─── Sub-component: FeaturesTab ───────────────────────────────────────────────

function FeaturesTab({ state, library, onToggleFeat }) {
  const pool = getPool({
    mode: state.mode,
    cls: state.cls,
    sources: state.sources,
    library,
  });

  if (!pool.length) {
    return (
      <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
        {state.mode === "classed"
          ? "Choose a class to see features."
          : "Select a power source."}
      </p>
    );
  }

  return (
    <>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        {state.selectedFeats.length} / 3 selected
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {pool.map((f) => {
          const sel = state.selectedFeats.includes(f.name);
          const maxed = state.selectedFeats.length >= 3 && !sel;
          const modStr = f.mods
            ? Object.entries(f.mods)
                .filter(([, v]) => v !== 0)
                .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
                .join("  ")
            : "";

          return (
            <div
              key={f.name}
              onClick={maxed ? undefined : () => onToggleFeat(f.name)}
              className={`rounded-xl p-3 border transition-all duration-200 ${
                maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              } ${
                sel
                  ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
                  : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-cyan-400 dark:hover:border-cyan-500/40 hover:scale-[1.01]"
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <span
                  className={`text-sm font-semibold ${sel ? "text-cyan-600 dark:text-cyan-400" : "text-slate-900 dark:text-white"}`}
                >
                  {f.name}
                </span>
                <div className="flex gap-1 flex-shrink-0">
                  <Tag label={f.type} variant={typeVariant(f.type)} />
                  <Tag label={f.cost} />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {f.desc}
              </p>
              {modStr && (
                <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-2">
                  {modStr}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Sub-component: PowersTab ─────────────────────────────────────────────────

function PowersTab({ state, library, set, onToggleFeat }) {
  const pool = getPool({
    mode: state.mode,
    cls: state.cls,
    sources: state.sources,
    library,
  });
  const filtered = pool.filter((f) => f.type === state.innerTab);

  if (!pool.length) {
    return (
      <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
        {state.mode === "classed"
          ? "Choose a class first."
          : "Select a power source."}
      </p>
    );
  }

  return (
    <>
      <div className="flex gap-2 mb-4 flex-wrap">
        {POWER_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => set({ innerTab: t, expandedPower: null })}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all duration-150 ${
              state.innerTab === t
                ? "bg-orange-50 dark:bg-orange-800/30 border-orange-300 dark:border-orange-500/40 text-orange-700 dark:text-orange-300"
                : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            {t}s
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm italic text-slate-400 dark:text-slate-500">
          No {state.innerTab.toLowerCase()}s available.
        </p>
      ) : (
        filtered.map((f) => {
          const open = state.expandedPower === f.name;
          const sel = state.selectedFeats.includes(f.name);
          const modStr = f.mods
            ? Object.entries(f.mods)
                .filter(([, v]) => v !== 0)
                .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
                .join("  ")
            : "";

          return (
            <div
              key={f.name}
              className={`rounded-xl border mb-2 overflow-hidden transition-all duration-200 ${
                sel
                  ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
                  : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
              }`}
            >
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
                onClick={() => set({ expandedPower: open ? null : f.name })}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-sm font-semibold ${sel ? "text-cyan-600 dark:text-cyan-400" : "text-slate-900 dark:text-white"}`}
                  >
                    {f.name}
                  </span>
                  <Tag label={f.type} variant={typeVariant(f.type)} />
                  <Tag label={f.cost} />
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-2">
                  {open ? "▲" : "▼"}
                </span>
              </div>

              {open && (
                <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3">
                    {f.desc}
                  </p>
                  {modStr && (
                    <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-2">
                      {modStr}
                    </p>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFeat(f.name);
                    }}
                    className={`mt-3 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                      sel
                        ? "bg-cyan-50 dark:bg-cyan-800/30 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
                        : "bg-white dark:bg-slate-700/40 border-slate-200 dark:border-slate-600/40 text-slate-600 dark:text-slate-300 hover:border-cyan-300 dark:hover:border-cyan-500/40"
                    } ${state.selectedFeats.length >= 3 && !sel ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={state.selectedFeats.length >= 3 && !sel}
                  >
                    {sel ? "Deselect" : "Select Power"}
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </>
  );
}

// ─── Sub-component: WeaponsTab ────────────────────────────────────────────────

function WeaponsTab({ state, library, onToggleWeapon }) {
  const weapons = library?.weapons || [];
  const grouped = weapons.reduce((acc, w) => {
    const cat = w.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(w);
    return acc;
  }, {});

  if (!weapons.length) {
    return (
      <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
        No weapons found in library.
      </p>
    );
  }

  return (
    <>
      {Object.entries(grouped).map(([cat, ws]) => (
        <div key={cat} className="mb-5 last:mb-0">
          <SectionLabel>{cat}</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ws.map((w) => {
              const sel = state.selectedWeapon === w.name;
              return (
                <div
                  key={w._id || w.name}
                  onClick={() => onToggleWeapon(w.name)}
                  className={`rounded-xl p-3 border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    sel
                      ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40"
                      : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-orange-300 dark:hover:border-orange-500/30"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold mb-1 ${sel ? "text-orange-600 dark:text-orange-400" : "text-slate-900 dark:text-white"}`}
                  >
                    {w.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {[w.damage || w.dmg, w.speed || w.spd, w.range]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Sub-component: SkillsTab ─────────────────────────────────────────────────

function SkillsTab({ state, library }) {
  const key =
    state.mode === "classless" ? "Classless" : state.cls || "Classless";
  const skills =
    library?.skills?.[key] || SKILLS?.[key] || SKILLS?.Classless || [];
  const bgEntry = (library?.backgrounds || []).find((b) => b.name === state.bg);
  const bgBonus = bgEntry?.mods?.skillBonus || null;

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-3">
            Skill
          </th>
          <th className="text-right text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-3">
            Bonus
          </th>
        </tr>
      </thead>
      <tbody>
        {skills.map((sk) => {
          const boosted = sk === bgBonus;
          return (
            <tr
              key={sk}
              className="border-t border-slate-100 dark:border-slate-700/50"
            >
              <td className="py-2 text-sm text-slate-900 dark:text-white">
                {sk}
                {boosted && (
                  <span className="ml-2 text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
                    (+bg)
                  </span>
                )}
              </td>
              <td
                className={`py-2 text-sm font-bold text-right ${boosted ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-500"}`}
              >
                {boosted ? "+3" : "+0"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ─── Sub-component: EquipmentTab ──────────────────────────────────────────────

function EquipmentTab({ state, onToggleArmor }) {
  return (
    <>
      <SectionLabel>Armor</SectionLabel>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {ARMOR.map((a) => {
          const sel = state.selectedArmor === a.key;
          return (
            <div
              key={a.key}
              onClick={() => onToggleArmor(a.key)}
              className={`rounded-xl p-3 border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                sel
                  ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40"
                  : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-orange-300 dark:hover:border-orange-500/30"
              }`}
            >
              <p
                className={`text-sm font-semibold mb-1 ${sel ? "text-orange-600 dark:text-orange-400" : "text-slate-900 dark:text-white"}`}
              >
                {a.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                +{a.def} Defense
              </p>
            </div>
          );
        })}
      </div>

      <SectionLabel>Current Loadout</SectionLabel>
      <div className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-800/60 dark:to-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700/50 px-4 py-1">
        {[
          ["Main Hand", state.selectedWeapon || "—"],
          [
            "Armor",
            state.selectedArmor
              ? ARMOR.find((a) => a.key === state.selectedArmor)?.label
              : "—",
          ],
        ].map(([label, val]) => (
          <div
            key={label}
            className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700/50 last:border-0"
          >
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {label}
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {val}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Main component: CharacterBuilder ────────────────────────────────────────

export function CharacterBuilder() {
  const [state, setState] = useState({
    name: "",
    subPronoun: "",
    objPronoun: "",
    age: "",
    portrait: null,
    race: "",
    bg: "",
    mode: "classed",
    cls: "",
    dip: "",
    sources: [],
    selectedFeats: [],
    selectedWeapon: "",
    selectedArmor: "",
    hpCurrent: 0,
    mpCurrent: 0,
    momCurrent: 0,
    currentTab: "Features",
    innerTab: "Passive",
    expandedPower: null,
  });

  const [library, setLibrary] = useState({});

  // useEffect(() => {
  //   fetchLibrary().then((data) => setLibrary(data || {}));
  // }, []);

  const set = useCallback((patch) => setState((s) => ({ ...s, ...patch })), []);

  const stats = computeStats(state, library);

  function toggleFeat(name) {
    const s = state.selectedFeats;
    if (s.includes(name)) {
      set({ selectedFeats: s.filter((x) => x !== name) });
    } else if (s.length < 3) {
      set({ selectedFeats: [...s, name] });
    }
  }

  function setMode(m) {
    set({
      mode: m,
      cls: "",
      dip: "",
      sources: [],
      selectedFeats: [],
      selectedWeapon: "",
      selectedArmor: "",
    });
  }

  function renderTab() {
    switch (state.currentTab) {
      case "Features":
        return (
          <FeaturesTab
            state={state}
            library={library}
            onToggleFeat={toggleFeat}
          />
        );
      case "Powers":
        return (
          <PowersTab
            state={state}
            library={library}
            set={set}
            onToggleFeat={toggleFeat}
          />
        );
      case "Weapons":
        return (
          <WeaponsTab
            state={state}
            library={library}
            onToggleWeapon={(w) =>
              set({ selectedWeapon: state.selectedWeapon === w ? "" : w })
            }
          />
        );
      case "Skills":
        return <SkillsTab state={state} library={library} />;
      case "Equipment":
        return (
          <EquipmentTab
            state={state}
            onToggleArmor={(k) =>
              set({ selectedArmor: state.selectedArmor === k ? "" : k })
            }
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50/30 to-slate-50 dark:from-slate-900 dark:via-cyan-950/20 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300 p-5 md:p-6">
      {/* Character header */}
      <CharacterHeader state={state} set={set} />

      {/* ① Mode chooser — prominent, above identity band */}
      {/* <ModeChooser mode={state.mode} setMode={setMode} /> */}

      {/* ② Identity band — race, background, class/dip or single source */}
      {/* <IdentityBand state={state} set={set} library={library} /> */}
      <IdentityBand
        state={state}
        set={set}
        library={library}
        setMode={setMode}
      />

      {/* ③ Resources — HP/MP/Mom now sit above stats */}
      <ResourceRow state={state} stats={stats} set={set} />

      {/* ④ Stat grid — combat stats only, no resource duplication */}
      <StatGrid stats={stats} />

      {/* ⑤ Two-column layout: Overview panel (left) + tab panel (right) */}
      {/* Overview panel is wider now; tab panel is narrower */}
      <div className="grid md:grid-cols-[280px_1fr] gap-4 items-start">
        {/* Left: persistent overview */}
        <OverviewPanel state={state} stats={stats} library={library} />

        {/* Right: Features / Powers / Weapons / Skills / Equipment */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm">
          <div className="flex border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => set({ currentTab: tab })}
                className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 font-semibold transition-all duration-150 ${
                  state.currentTab === tab
                    ? "border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-transparent"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4 md:p-5 min-h-80">{renderTab()}</div>
        </div>
      </div>
    </div>
  );
}
