import { useState, useCallback, useEffect } from "react";
import { SKILLS } from "./Skills";
import { fetchLibrary } from "../../library/api/libraryApi";
// ─── Data ─────────────────────────────────────────────────────────────────────

const CLASSES = ["Martial", "Sorcerer", "Wizard", "Witch"];

const BASE_STATS = {
  Martial: {
    mov: 6,
    atk: 2,
    def: 12,
    dom: 6,
    eva: 1,
    sok: 2,
    momCap: 5,
    hp: 40,
    mp: 10,
  },
  Sorcerer: {
    mov: 5,
    atk: 1,
    def: 10,
    dom: 6,
    eva: 2,
    sok: 0,
    momCap: 5,
    hp: 28,
    mp: 30,
  },
  Wizard: {
    mov: 4,
    atk: 1,
    dom: 6,
    def: 9,
    eva: 1,
    sok: 0,
    momCap: 4,
    hp: 24,
    mp: 40,
  },
  Witch: {
    mov: 5,
    atk: 1,
    dom: 6,
    def: 10,
    eva: 1,
    sok: 1,
    momCap: 4,
    hp: 30,
    mp: 25,
  },
  Classless: {
    mov: 5,
    atk: 0,
    dom: 6,
    def: 10,
    eva: 0,
    sok: 0,
    momCap: 3,
    hp: 26,
    mp: 20,
  },
};

const RACE_MODS = {
  Human: { mov: 0, atk: 0, def: 0, eva: 0, sok: 0, hp: 4, mp: 0 },
  Elf: { mov: 1, atk: 0, def: 0, eva: 2, sok: 0, hp: 0, mp: 8 },
  Dwarf: { mov: -1, atk: 0, def: 2, eva: 0, sok: 2, hp: 8, mp: 0 },
  Halfling: { mov: 0, atk: 1, def: 0, eva: 1, sok: 0, hp: 2, mp: 4 },
  Tiefling: { mov: 0, atk: 1, def: 1, eva: 0, sok: 0, hp: 2, mp: 6 },
};

const BG_MODS = {
  Soldier: { atk: 1, skillBonus: "Athletics" },
  Scholar: { def: 1, skillBonus: "Arcana" },
  Wanderer: { mov: 1, skillBonus: "Survival" },
  Acolyte: { sok: 1, skillBonus: "Religion", mp: 6 },
  Criminal: { eva: 1, skillBonus: "Stealth" },
};

const FEATURES = {
  Martial: [
    {
      name: "Iron Stance",
      type: "Innate",
      cost: "1M",
      desc: "Reduce incoming damage by 2 until next turn.",
      mods: { sok: 2 },
    },
    {
      name: "Chain Strike",
      type: "Learned",
      cost: "2M",
      desc: "Strike twice; on both hits push target 1 zone.",
      mods: { atk: 1 },
    },
    {
      name: "War Cry",
      type: "Innate",
      cost: "1M",
      desc: "Allies in range gain +1 Momentum next action.",
      mods: {},
    },
    {
      name: "Momentum Surge",
      type: "Learned",
      cost: "0M",
      desc: "On kill, gain 2 Momentum immediately.",
      mods: {},
    },
    {
      name: "Shield Wall",
      type: "Innate",
      cost: "1M",
      desc: "Raise defense until your next turn.",
      mods: { def: 3 },
    },
    {
      name: "Reckless Strike",
      type: "Learned",
      cost: "1M",
      desc: "Deal +4 damage; take -2 Defense until next turn.",
      mods: { atk: 3 },
    },
  ],
  Sorcerer: [
    {
      name: "Fated Strike",
      type: "Innate",
      cost: "1M",
      desc: "Reroll any die. Adds Resonance charge.",
      mods: { atk: 1 },
    },
    {
      name: "Probability Warp",
      type: "Learned",
      cost: "2M",
      desc: "Force target reroll, take lower. +2 Resonance.",
      mods: {},
    },
    {
      name: "Unravel",
      type: "Innate",
      cost: "1M",
      desc: "Spend Resonance to drop a status 1 stack.",
      mods: {},
    },
    {
      name: "Cascade",
      type: "Learned",
      cost: "3M",
      desc: "Trigger Backlash early; convert Resonance to arc damage.",
      mods: { atk: 2 },
    },
    {
      name: "Veil Step",
      type: "Innate",
      cost: "2M",
      desc: "Briefly phase. +3 Evasion this round.",
      mods: { eva: 3 },
    },
  ],
  Wizard: [
    {
      name: "Sigil Bind",
      type: "Learned",
      cost: "2M",
      desc: "Place glyph that fires on next enemy zone entry.",
      mods: {},
    },
    {
      name: "Arcane Sight",
      type: "Innate",
      cost: "1M",
      desc: "Detect magic sources and traditions within 3 zones.",
      mods: {},
    },
    {
      name: "Force Lance",
      type: "Learned",
      cost: "2M",
      desc: "Ranged hit + push 1 zone. Pierces Evasion at +1.",
      mods: { atk: 2 },
    },
    {
      name: "Counterspell",
      type: "Innate",
      cost: "2M",
      desc: "Interrupt and negate a Power being activated.",
      mods: {},
    },
    {
      name: "Arcane Barrier",
      type: "Innate",
      cost: "1M",
      desc: "Conjure a ward. +4 Defense this round.",
      mods: { def: 4 },
    },
  ],
  Witch: [
    {
      name: "Hex",
      type: "Innate",
      cost: "1M",
      desc: "Apply Cursed 1. Stacks. +1 damage per stack on hits.",
      mods: {},
    },
    {
      name: "Blood Drain",
      type: "Learned",
      cost: "2M",
      desc: "Deal damage equal to Cursed stacks on target. Heal half.",
      mods: { atk: 1 },
    },
    {
      name: "Spirit Binding",
      type: "Innate",
      cost: "2M",
      desc: "Root target 1 round; they cannot spend Momentum.",
      mods: {},
    },
    {
      name: "Blight Touch",
      type: "Learned",
      cost: "1M",
      desc: "Apply Weakened 1. Target deals -1 per stack.",
      mods: {},
    },
    {
      name: "Shroud",
      type: "Innate",
      cost: "1M",
      desc: "Wrap self in shadow. +2 Evasion, +1 Movement.",
      mods: { eva: 2, mov: 1 },
    },
  ],
};

const CLASSLESS_FEATS = [
  {
    name: "Instinct",
    type: "Innate",
    cost: "0M",
    src: "Chi",
    desc: "React before hit resolves. +1 Evasion this hit.",
    mods: { eva: 1 },
  },
  {
    name: "Wild Draw",
    type: "Learned",
    cost: "2M",
    src: "Arcane",
    desc: "Pull random power from any tradition until encounter ends.",
    mods: {},
  },
  {
    name: "Mend",
    type: "Innate",
    cost: "1M",
    src: "Natural",
    desc: "Recover 2 HP at start of turn if not attacked last round.",
    mods: {},
  },
  {
    name: "Mind Spike",
    type: "Learned",
    cost: "2M",
    src: "Psionic",
    desc: "Deal psychic damage; target loses 1 Momentum.",
    mods: { atk: 1 },
  },
  {
    name: "Sanguine Mark",
    type: "Learned",
    cost: "1M",
    src: "Blood",
    desc: "Mark target; your next hit deals +3.",
    mods: { atk: 2 },
  },
  {
    name: "Smite",
    type: "Innate",
    cost: "2M",
    src: "Divine",
    desc: "Imbue next hit with radiant damage. Ignores soak.",
    mods: { atk: 2 },
  },
];

const WEAPONS = {
  Melee: [
    { name: "Longsword", dmg: "1d8+Atk", spd: "2M", range: "Melee" },
    { name: "Warhammer", dmg: "1d10+Atk", spd: "3M", range: "Melee" },
    { name: "Rapier", dmg: "1d6+Atk", spd: "1M", range: "Melee" },
    { name: "Dagger", dmg: "1d4+Atk", spd: "1M", range: "Melee/Thrown" },
    { name: "Greatsword", dmg: "2d6+Atk", spd: "3M", range: "Melee" },
  ],
  Ranged: [
    { name: "Shortbow", dmg: "1d6", spd: "2M", range: "Far" },
    { name: "Crossbow", dmg: "1d8", spd: "3M", range: "Far" },
    { name: "Hand Crossbow", dmg: "1d6", spd: "1M", range: "Near" },
  ],
  Arcane: [
    { name: "Staff", dmg: "1d6+Atk", spd: "2M", range: "Near" },
    { name: "Wand", dmg: "1d4+Atk", spd: "1M", range: "Near" },
    { name: "Tome", dmg: "—", spd: "—", range: "—" },
  ],
};

const SPELLS = {
  Wizard: [
    {
      name: "Magic Missile",
      school: "Force",
      cost: "2M",
      range: "Far",
      desc: "Auto-hit. 1d4+2 force per missile (3 missiles).",
    },
    {
      name: "Shield",
      school: "Abjuration",
      cost: "1M",
      range: "Self",
      desc: "+5 Defense until next turn. Reaction.",
    },
    {
      name: "Burning Hands",
      school: "Fire",
      cost: "2M",
      range: "Near",
      desc: "Cone of fire. 3d6 fire damage, save for half.",
    },
    {
      name: "Sleep",
      school: "Enchantment",
      cost: "3M",
      range: "Near",
      desc: "Lowest HP creatures in range fall unconscious.",
    },
  ],
  Sorcerer: [
    {
      name: "Chaos Bolt",
      school: "Wild",
      cost: "2M",
      range: "Far",
      desc: "1d8 random damage type. Doubles chain to new target.",
    },
    {
      name: "Bend Fate",
      school: "Fate",
      cost: "1M",
      range: "Self",
      desc: "After seeing a roll, force a reroll. Take either result.",
    },
    {
      name: "Surge",
      school: "Wild",
      cost: "0M",
      range: "Self",
      desc: "Once per round: +1d6 to any damage roll.",
    },
  ],
  Witch: [
    {
      name: "Wither",
      school: "Blood",
      cost: "2M",
      range: "Near",
      desc: "2d6 necrotic. Regain HP equal to half damage dealt.",
    },
    {
      name: "Cursed Ground",
      school: "Hex",
      cost: "3M",
      range: "Near",
      desc: "Zone becomes cursed. Enemies take 1d4 necrotic/turn.",
    },
    {
      name: "Bind Spirit",
      school: "Spirit",
      cost: "2M",
      range: "Near",
      desc: "Summon bound spirit that attacks once/round (1d6).",
    },
  ],
  Martial: [],
};

// const SKILLS = {
//   Martial: [
//     "Athletics",
//     "Intimidation",
//     "Weapon Mastery",
//     "Endurance",
//     "Tactics",
//     "Survival",
//   ],
//   Sorcerer: [
//     "Arcana",
//     "Perception",
//     "Fate Reading",
//     "Persuasion",
//     "History",
//     "Insight",
//   ],
//   Wizard: [
//     "Arcana",
//     "History",
//     "Investigation",
//     "Medicine",
//     "Nature",
//     "Religion",
//   ],
//   Witch: ["Arcana", "Nature", "Deception", "Stealth", "Insight", "Survival"],
//   Classless: [
//     "Athletics",
//     "Arcana",
//     "Perception",
//     "Stealth",
//     "Survival",
//     "Insight",
//     "Nature",
//     "History",
//   ],
// };

const ARMOR = [
  { key: "Light", label: "Light armor", def: 1 },
  { key: "Medium", label: "Medium armor", def: 2 },
  { key: "Heavy", label: "Heavy armor", def: 4 },
  { key: "Robes", label: "Arcane robes", def: 0 },
];

const SOURCES = ["Arcane", "Natural", "Psionic", "Divine", "Blood", "Chi"];
const TABS = [
  "Overview",
  "Features",
  "Powers",
  "Weapons",
  "Spells",
  "Skills",
  "Equipment",
];

// ─── Stat computation ─────────────────────────────────────────────────────────

function computeStats(state) {
  const { mode, cls, race, bg, selectedFeats, selectedArmor, sources } = state;
  const baseKey = mode === "classless" ? "Classless" : cls || "Classless";
  const base = { ...(BASE_STATS[baseKey] || BASE_STATS.Classless) };
  const rm = RACE_MODS[race] || {};
  const bm = BG_MODS[bg] || {};

  const mods = { mov: 0, atk: 0, def: 0, eva: 0, sok: 0, hp: 0, mp: 0 };
  const modSources = [];

  const pool =
    mode === "classed"
      ? FEATURES[cls] || []
      : CLASSLESS_FEATS.filter((f) => sources.includes(f.src));

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
    mov: base.mov + (rm.mov || 0) + (bm.mov || 0) + mods.mov,
    atk: base.atk + (rm.atk || 0) + (bm.atk || 0) + mods.atk,
    def: base.def + (rm.def || 0) + (bm.def || 0) + mods.def + armorDef,
    eva: base.eva + (rm.eva || 0) + (bm.eva || 0) + mods.eva,
    sok: base.sok + (rm.sok || 0) + (bm.sok || 0) + mods.sok,
    hp: base.hp + (rm.hp || 0) + (bm.hp || 0) + mods.hp,
    mp: base.mp + (rm.mp || 0) + (bm.mp || 0) + mods.mp,
    momCap: base.momCap,
    modSources,
  };
}

// ─── Shared small components ──────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
      {children}
    </p>
  );
}

function Tag({ label, variant = "neutral" }) {
  const base =
    "text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap border";
  const styles = {
    learned: `${base} bg-cyan-100 dark:bg-cyan-800/30 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/30`,
    innate: `${base} bg-orange-100 dark:bg-orange-800/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-500/30`,
    neutral: `${base} bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600/40`,
  };
  return <span className={styles[variant] || styles.neutral}>{label}</span>;
}

function ResourceBar({ label, current, max, valueClass, fillClass, onSet }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <span className={`text-xs font-bold ${valueClass}`}>
          {current} / {max}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: max }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSet(i + 1 === current ? i : i + 1)}
            className={`w-3.5 h-3.5 rounded-full border-[1.5px] transition-all duration-150 ${
              i < current
                ? `${fillClass} border-transparent`
                : "bg-transparent border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, highlighted }) {
  return (
    <div
      className={`rounded-xl p-3 text-center transition-all duration-300 border ${
        highlighted
          ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
          : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-cyan-500/20"
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${
          highlighted
            ? "text-cyan-600 dark:text-cyan-400"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-xl font-bold leading-none ${
          highlighted
            ? "text-cyan-600 dark:text-cyan-400"
            : "text-slate-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Tab: Overview ────────────────────────────────────────────────────────────

function OverviewTab({ state, stats }) {
  const {
    mode,
    cls,
    dip,
    race,
    bg,
    selectedFeats,
    selectedWeapon,
    selectedArmor,
    sources,
  } = state;
  const clsLabel = mode === "classless" ? "Classless" : cls || "—";
  const pool =
    mode === "classed"
      ? FEATURES[cls] || []
      : CLASSLESS_FEATS.filter((f) => sources.includes(f.src));

  const Row = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-900 dark:text-white">
        {value || "—"}
      </span>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div>
        <SectionLabel>Identity</SectionLabel>
        <div className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-800/60 dark:to-slate-900/60 rounded-xl border border-slate-200 dark:border-cyan-500/20 px-4 py-1 mb-4">
          <Row label="Race" value={race} />
          <Row label="Background" value={bg} />
          <Row label="Class" value={clsLabel} />
          {dip && <Row label="Dip" value={dip} />}
          {mode === "classless" && sources.length > 0 && (
            <Row label="Sources" value={sources.join(", ")} />
          )}
        </div>
        <SectionLabel>Loadout</SectionLabel>
        <div className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-800/60 dark:to-slate-900/60 rounded-xl border border-slate-200 dark:border-cyan-500/20 px-4 py-1">
          <Row label="Weapon" value={selectedWeapon} />
          <Row
            label="Armor"
            value={
              selectedArmor
                ? ARMOR.find((a) => a.key === selectedArmor)?.label
                : null
            }
          />
        </div>
      </div>

      <div>
        <SectionLabel>Active features ({selectedFeats.length}/3)</SectionLabel>
        <div className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-800/60 dark:to-slate-900/60 rounded-xl border border-slate-200 dark:border-cyan-500/20 px-4 py-1 mb-4">
          {selectedFeats.length === 0 ? (
            <p className="text-sm italic text-slate-400 dark:text-slate-500 py-3">
              No features selected yet.
            </p>
          ) : (
            selectedFeats.map((name) => {
              const f = pool.find((x) => x.name === name);
              return (
                <div
                  key={name}
                  className="py-2 border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                      {name}
                    </span>
                    <div className="flex gap-1">
                      {f && (
                        <Tag
                          label={f.type}
                          variant={f.type === "Innate" ? "innate" : "learned"}
                        />
                      )}
                      {f && <Tag label={f.cost} />}
                    </div>
                  </div>
                  {f && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {f.desc}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {stats.modSources.length > 0 && (
          <>
            <SectionLabel>Stat modifiers</SectionLabel>
            <div className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-800/60 dark:to-slate-900/60 rounded-xl border border-slate-200 dark:border-cyan-500/20 px-4 py-1">
              {stats.modSources.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                >
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {m.label}
                  </span>
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                    +{m.val} {m.key.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Features & Powers ───────────────────────────────────────────────────

function FeaturesTab({ state, onToggleFeat }) {
  const { mode, cls, sources, selectedFeats } = state;
  const pool =
    mode === "classed"
      ? FEATURES[cls] || []
      : CLASSLESS_FEATS.filter((f) => sources.includes(f.src));

  if (!pool.length) {
    return (
      <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
        {mode === "classed"
          ? "Choose a class to see features."
          : "Select at least one power source."}
      </p>
    );
  }

  return (
    <>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        {selectedFeats.length} / 3 selected
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {pool.map((f) => {
          const sel = selectedFeats.includes(f.name);
          const maxed = selectedFeats.length >= 3 && !sel;
          const modStr =
            f.mods &&
            Object.entries(f.mods)
              .filter(([, v]) => v !== 0)
              .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
              .join("  ");

          return (
            <div
              key={f.name}
              onClick={maxed ? undefined : () => onToggleFeat(f.name)}
              className={`rounded-xl p-3 border transition-all duration-200 ${
                maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              } ${
                sel
                  ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
                  : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500/40 hover:scale-[1.01]"
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <span
                  className={`text-sm font-semibold ${sel ? "text-cyan-600 dark:text-cyan-400" : "text-slate-900 dark:text-white"}`}
                >
                  {f.name}
                </span>
                <div className="flex gap-1 flex-shrink-0">
                  <Tag
                    label={f.type}
                    variant={f.type === "Innate" ? "innate" : "learned"}
                  />
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

// ─── Tab: Weapons ─────────────────────────────────────────────────────────────

function WeaponsTab({ onToggleWeapon, library }) {
  return (
    <>
      {library.weapons.map((cat, ws, w) => {
        // const ws = cat.weapons; // assuming each category has a weapons array
        console.log(w, cat);
        const sel = state.selectedWeapon === w.name;
        return (
          <div key={cat.name} className="mb-5 last:mb-0">
            <SectionLabel>{cat.name}</SectionLabel>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div
                key={cat._id}
                onClick={() => onToggleWeapon(cat.name)}
                className={`rounded-xl p-3 border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  sel
                    ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40"
                    : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-cyan-500/20 hover:border-orange-300 dark:hover:border-orange-500/30"
                }`}
              >
                <p
                  className={`text-sm font-semibold mb-1 ${
                    sel
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {cat.name}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {cat.dmg} · {cat.spd} · {cat.range}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
// function WeaponsTab({ state, onToggleWeapon }) {
//   return (
//     <>
//       {Object.entries(WEAPONS).map(([cat, ws]) => (
//         <div key={cat} className="mb-5 last:mb-0">
//           <SectionLabel>{cat}</SectionLabel>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//             {ws.map((w) => {
//               const sel = state.selectedWeapon === w.name;
//               return (
//                 <div
//                   key={w.name}
//                   onClick={() => onToggleWeapon(w.name)}
//                   className={`rounded-xl p-3 border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
//                     sel
//                       ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40"
//                       : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-cyan-500/20 hover:border-orange-300 dark:hover:border-orange-500/30"
//                   }`}
//                 >
//                   <p
//                     className={`text-sm font-semibold mb-1 ${sel ? "text-orange-600 dark:text-orange-400" : "text-slate-900 dark:text-white"}`}
//                   >
//                     {w.name}
//                   </p>
//                   <p className="text-xs text-slate-500 dark:text-slate-400">
//                     {w.dmg} · {w.spd} · {w.range}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// ─── Tab: Spells ──────────────────────────────────────────────────────────────

function SpellsTab({ state }) {
  const { cls, dip } = state;
  const spells = [
    ...(SPELLS[cls] || []),
    ...(dip && dip !== cls ? SPELLS[dip] || [] : []),
  ];

  if (!spells.length) {
    return (
      <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
        No spells available. Requires Sorcerer, Wizard, or Witch as primary
        class or dip.
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {spells.map((s) => (
        <div
          key={s.name}
          className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-cyan-500/20 p-3 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all duration-200"
        >
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
            {s.name}
          </p>
          <div className="flex gap-1 flex-wrap mb-2">
            <Tag label={s.school} variant="learned" />
            <Tag label={s.cost} />
            <Tag label={s.range} />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {s.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Skills ──────────────────────────────────────────────────────────────

function SkillsTab({ state }) {
  const { mode, cls, bg } = state;
  const skills =
    SKILLS[mode === "classless" ? "Classless" : cls] || SKILLS.Classless;
  const bgBonus = BG_MODS[bg]?.skillBonus;

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-3">
            Skill
          </th>
          <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-3">
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
                  <span className="ml-2 text-xs text-cyan-600 dark:text-cyan-400">
                    (+bg)
                  </span>
                )}
              </td>
              <td
                className={`py-2 text-sm font-bold text-right ${
                  boosted
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
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

// ─── Tab: Equipment ───────────────────────────────────────────────────────────

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
                  : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-cyan-500/20 hover:border-orange-300 dark:hover:border-orange-500/30"
              }`}
            >
              <p
                className={`text-sm font-semibold mb-1 ${
                  sel
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-slate-900 dark:text-white"
                }`}
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

      <SectionLabel>Current loadout</SectionLabel>
      <div className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-800/60 dark:to-slate-900/60 rounded-xl border border-slate-200 dark:border-cyan-500/20 px-4 py-1">
        {[
          ["Main hand", state.selectedWeapon || "—"],
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

// ─── Main component ───────────────────────────────────────────────────────────

export function CharacterBuilder() {
  const [state, setState] = useState({
    name: "",
    subPronoun: "",
    objPronoun: "",
    race: "",
    bg: "",
    mode: "classed",
    cls: "",
    dip: "",
    sources: [],
    selectedFeats: [],
    selectedWeapon: "",
    selectedArmor: "",
    currentTab: "Overview",
    momCurrent: 3,
    hpCurrent: 20,
    mpCurrent: 10,
  });

  const [library, setLibrary] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const libraryData = await fetchLibrary();
      setLibrary(libraryData);
    };
    fetchData();
  }, []);

  console.log(library?.weapons?.map((p) => p.name));

  const set = useCallback((patch) => setState((s) => ({ ...s, ...patch })), []);
  const stats = computeStats(state);
  const dipOptions = CLASSES.filter((c) => c !== state.cls);

  function toggleFeat(name) {
    const s = state.selectedFeats;
    if (s.includes(name)) set({ selectedFeats: s.filter((x) => x !== name) });
    else if (s.length < 3) set({ selectedFeats: [...s, name] });
  }

  function toggleSource(src) {
    const s = state.sources;
    set({
      sources: s.includes(src) ? s.filter((x) => x !== src) : [...s, src],
      selectedFeats: [],
    });
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

  const STAT_DEFS = [
    { key: "acc", label: "Accuracy", fmt: (v) => v },
    { key: "atk", label: "Attack", fmt: (v) => (v >= 0 ? "+" : "") + v },
    { key: "dom", label: "Dominance", fmt: (v) => v },
    { key: "def", label: "Defense", fmt: (v) => v },
    { key: "res", label: "Resilience", fmt: (v) => v },
    { key: "rsl", label: "Resolve", fmt: (v) => v },
    { key: "mov", label: "Movement", fmt: (v) => v },
  ];

  const hasModOn = (key) => stats.modSources.some((m) => m.key === key);
  const pronounDisplay = [state.subPronoun, state.objPronoun]
    .filter(Boolean)
    .join("/");

  const selectCls =
    "bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm px-2.5 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 cursor-pointer transition-colors";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 text-slate-900 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 dark:text-white transition-colors duration-300 p-5 md:p-6">
      {/* ── Header ── */}
      <div className="mb-5">
        <input
          className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-600 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 pb-1 transition-colors"
          placeholder="Character name"
          value={state.name}
          onChange={(e) => set({ name: e.target.value })}
        />

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Race
          </span>

          {/* Race + Background on same line */}
          <select
            className={selectCls}
            value={state.race}
            onChange={(e) => set({ race: e.target.value })}
          >
            <option value="">Race</option>
            {["Human", "Elf", "Dwarf", "Halfling", "Tiefling"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Background
          </span>

          <select
            className={selectCls}
            value={state.bg}
            onChange={(e) => set({ bg: e.target.value })}
          >
            <option value="">Background</option>
            {["Soldier", "Scholar", "Wanderer", "Acolyte", "Criminal"].map(
              (b) => (
                <option key={b}>{b}</option>
              ),
            )}
          </select>
          {/* Pronouns label */}
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pronouns
          </span>

          <input
            className="w-16 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm px-2.5 py-1.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            placeholder="they"
            value={state.subPronoun}
            onChange={(e) => set({ subPronoun: e.target.value })}
          />
          <input
            className="w-16 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm px-2.5 py-1.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            placeholder="them"
            value={state.objPronoun}
            onChange={(e) => set({ objPronoun: e.target.value })}
          />

          {/* Live pronoun badge */}
          {pronounDisplay && (
            <span className="inline-flex items-center bg-cyan-100 dark:bg-cyan-800/30 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200">
              {pronounDisplay}
            </span>
          )}

          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Age
          </span>

          <input
            className="w-16 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm px-2.5 py-1.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            placeholder="age"
            value={state.objPronoun}
            onChange={(e) => set({ objPronoun: e.target.value })}
          />
        </div>
      </div>

      {/* ── Stat row ── */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {STAT_DEFS.map(({ key, label, fmt }) => (
          <StatCard
            key={key}
            label={label}
            value={fmt(stats[key])}
            highlighted={hasModOn(key)}
          />
        ))}
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid md:grid-cols-[220px_1fr] gap-4 items-start">
        {/* ── Left column ── */}
        <div className="flex flex-col gap-3">
          {/* Resources */}
          {/* <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/80 rounded-2xl border border-slate-200 dark:border-cyan-500/20 p-4 shadow-md">
            <SectionLabel>Resources</SectionLabel>
            <ResourceBar
              label="HP"
              current={Math.min(state.hpCurrent, stats.hp)}
              max={stats.hp}
              valueClass="text-green-600 dark:text-green-400"
              fillClass="bg-green-500 dark:bg-green-400"
              onSet={(v) => set({ hpCurrent: Math.min(v, stats.hp) })}
            />
            <ResourceBar
              label="MP"
              current={Math.min(state.mpCurrent, stats.mp)}
              max={stats.mp}
              valueClass="text-cyan-600 dark:text-cyan-400"
              fillClass="bg-cyan-500 dark:bg-cyan-400"
              onSet={(v) => set({ mpCurrent: Math.min(v, stats.mp) })}
            />
            <ResourceBar
              label="Momentum"
              current={Math.min(state.momCurrent, stats.momCap)}
              max={stats.momCap}
              valueClass="text-orange-600 dark:text-orange-400"
              fillClass="bg-gradient-to-r from-cyan-500 to-orange-500"
              onSet={(v) => set({ momCurrent: Math.min(v, stats.momCap) })}
            />
          </div> */}

          {/* Class */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/80 rounded-2xl border border-slate-200 dark:border-cyan-500/20 p-4 shadow-md">
            <SectionLabel>Class</SectionLabel>

            <div className="flex bg-slate-100 dark:bg-slate-700/40 rounded-lg p-0.5 gap-0.5 mb-3">
              {["classed", "classless"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    state.mode === m
                      ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-500/50"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  {m === "classed" ? "Class" : "Classless"}
                </button>
              ))}
            </div>

            {state.mode === "classed" ? (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Primary
                </p>

                <select
                  className={`${selectCls} w-full mb-3`}
                  value={state.cls}
                  onChange={(e) =>
                    set({ cls: e.target.value, dip: "", selectedFeats: [] })
                  }
                >
                  <option value="">— choose —</option>
                  {library?.professions?.map((p) => (
                    <option key={p._id}>{p.title}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Auxiliary
                </p>
                <select
                  className={`${selectCls} w-full`}
                  value={state.dip}
                  onChange={(e) => set({ dip: e.target.value })}
                >
                  <option value="">None</option>
                  {library?.professions?.map((p) => (
                    <option key={p._id}>{p.title}</option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Power sources
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {SOURCES.map((src) => {
                    const sel = state.sources.includes(src);
                    return (
                      <button
                        key={src}
                        onClick={() => toggleSource(src)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                          sel
                            ? "bg-cyan-50 dark:bg-cyan-800/30 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
                            : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 hover:border-cyan-300 dark:hover:border-cyan-500/30 hover:text-slate-700 dark:hover:text-slate-200"
                        }`}
                      >
                        {src}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Active modifiers */}
          {stats.modSources.length > 0 && (
            <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/80 rounded-2xl border border-slate-200 dark:border-cyan-500/20 p-4 shadow-md">
              <SectionLabel>Active modifiers</SectionLabel>
              {stats.modSources.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/50 last:border-0"
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
        </div>

        {/* ── Right: tab panel ── */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/80 rounded-2xl border border-slate-200 dark:border-cyan-500/20 overflow-hidden shadow-md">
          {/* Tab bar */}
          <div className="flex border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => set({ currentTab: tab })}
                className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 font-medium transition-all duration-150 ${
                  state.currentTab === tab
                    ? "border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-transparent"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab body */}
          <div className="p-4 md:p-5 min-h-80">
            {state.currentTab === "Overview" && (
              <OverviewTab state={state} stats={stats} library={library} />
            )}
            {state.currentTab === "Features & Powers" && (
              <FeaturesTab state={state} onToggleFeat={toggleFeat} />
            )}
            {state.currentTab === "Weapons" && (
              <WeaponsTab
                state={state}
                onToggleWeapon={(w) =>
                  set({ selectedWeapon: state.selectedWeapon === w ? "" : w })
                }
                library={library}
              />
            )}
            {state.currentTab === "Spells" && <SpellsTab state={state} />}
            {state.currentTab === "Skills" && <SkillsTab state={state} />}
            {state.currentTab === "Equipment" && (
              <EquipmentTab
                state={state}
                onToggleArmor={(k) =>
                  set({ selectedArmor: state.selectedArmor === k ? "" : k })
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
