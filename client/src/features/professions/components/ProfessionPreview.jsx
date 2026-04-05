import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProfessionContext } from "../context/ProfessionContext";
import {
  LuCrown,
  LuShield,
  LuSword,
  LuZap,
  LuArrowRight,
  LuSparkles,
} from "react-icons/lu";

const ABILITY_LABELS = {
  strength: "STR",
  dexterity: "DEX",
  constitution: "CON",
  intelligence: "INT",
  wisdom: "WIS",
  charisma: "CHA",
};

// Derive a role label from available class data
const deriveRole = (profession) => {
  const armor = (profession.armor || "").toLowerCase();
  const hasSpell = !!profession.spellcastingAbility || !!profession.spell;
  const hasHeavy = armor.includes("heavy");
  const hasMedium = armor.includes("medium");

  if (hasHeavy && !hasSpell) return { label: "Tank", color: "orange" };
  if (hasHeavy && hasSpell) return { label: "Paladin-type", color: "orange" };
  if (hasMedium && hasSpell) return { label: "Support", color: "cyan" };
  if (hasMedium && !hasSpell) return { label: "Skirmisher", color: "cyan" };
  if (hasSpell) return { label: "Striker", color: "cyan" };
  return { label: "Martial", color: "orange" };
};

const getClassIcon = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("mage") || t.includes("wizard") || t.includes("sorcerer"))
    return LuSparkles;
  if (t.includes("warrior") || t.includes("fighter") || t.includes("barbarian"))
    return LuSword;
  if (t.includes("paladin") || t.includes("cleric")) return LuShield;
  if (t.includes("rogue") || t.includes("ranger")) return LuZap;
  return LuCrown;
};

function StatChip({ label, value }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/40 rounded-lg px-3 py-2">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
        {value || "—"}
      </p>
    </div>
  );
}

export const ProfessionPreview = () => {
  const { professionList } = useContext(ProfessionContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {professionList.map((profession) => {
        const Icon = getClassIcon(profession.title);
        const role = deriveRole(profession);
        const spellAbility = profession.spellcastingAbility
          ? ABILITY_LABELS[profession.spellcastingAbility] ||
            profession.spellcastingAbility
          : null;
        const primaryAbility = profession.spellcastingAbility
          ? ABILITY_LABELS[profession.spellcastingAbility] ||
            profession.spellcastingAbility
          : null;
        const roleCyan = role.color === "cyan";

        return (
          <NavLink
            key={profession._id}
            to={`/professions/${profession._id}`}
            className="block"
          >
            <div className="group cursor-pointer relative h-full bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-cyan-950/80 rounded-2xl border border-slate-200 dark:border-cyan-500/20 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400 dark:hover:border-cyan-500/40 shadow-md hover:shadow-xl backdrop-blur-sm">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-orange-400 to-orange-500" />

              {/* Background orb */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-orange-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative p-6">
                {/* Icon + Role badge row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-xl p-3 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {/* Derived role tag — replaces the lone hit die badge */}
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      roleCyan
                        ? "bg-cyan-100 dark:bg-cyan-800/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-600/30"
                        : "bg-orange-100 dark:bg-orange-800/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-600/30"
                    }`}
                  >
                    {role.label}
                  </span>
                </div>

                {/* Title — bumped up to text-2xl for stronger hierarchy */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                  {profession.title}
                </h3>

                {/* Subclass count as subtle subtitle */}
                {profession.subclasses?.length > 0 && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                    {profession.subclasses.length} subclasses
                  </p>
                )}

                {/* Description */}
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm line-clamp-2 mb-5">
                  {profession.description ||
                    "A master of their craft, forged through battle and perseverance."}
                </p>

                {/* Top stat row — always 3 chips, hit die moved here */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <StatChip
                    label="Hit Die"
                    value={profession.hitDie ? `d${profession.hitDie}` : null}
                  />
                  <StatChip label="Primary" value={primaryAbility} />
                  <StatChip label="Casting" value={spellAbility ?? "None"} />
                </div>

                {/* Bottom stat row — class-specific */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <StatChip
                    label="Armor"
                    value={profession.armorProficiencies}
                  />
                  <StatChip
                    label="Weapon"
                    value={profession.weaponProficiencies}
                  />
                  {profession.spell && (
                    <StatChip
                      label="Magic"
                      value={profession.spellProficiencies}
                    />
                  )}
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <LuArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
